// Imports
import { addressCodec, hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { Body } from '../../../model';

// Types
import { BodyCreationData } from '../../../@types/pallets/control/bodyCreationData';
import { GameDaoControlBodyCreatedEvent } from '../../../types/events';
import { GameDaoControlCreateCall } from '../../../types/calls';
import { addBodyMember } from '../../../database/bodyMember';

// Logic
async function handleBodyCreatedEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get versioned call
	const callCreateData = getCreateData(context);
	if (!callCreateData) return;

	// Get versioned instance
	const bodyCreatedEventData = new GameDaoControlBodyCreatedEvent(context);

	// Create body
	const body = new Body();

	// Get id
	if (bodyCreatedEventData.isV21) {
		body.id = hashToHexString(bodyCreatedEventData.asV21[1]);
	} else {
		console.error(`Unknown version of body created event!`);
		return;
	}

	body.creator = context.extrinsic.signer;
	body.controller = addressCodec.encode(callCreateData.controller);
	body.treasury = addressCodec.encode(callCreateData.treasury);
	body.cid = callCreateData.cid.toString();
	body.body = callCreateData.body;
	body.access = callCreateData.access;
	body.feeModel = callCreateData.feeModel;
	body.fee = callCreateData.fee;
	body.govAsset = callCreateData.govAsset;
	body.payAsset = callCreateData.payAsset;
	body.memberLimit = callCreateData.memberLimit;

	await context.store.save(body);

	await addBodyMember(context.store, body.id, body.creator);
}

function getCreateData(context: EventHandlerContext): BodyCreationData | null {
	if (context.extrinsic) {
		// Get versioned extrinsic call
		const createData = new GameDaoControlCreateCall({
			_chain: context._chain,
			block: context.block,
			extrinsic: context.extrinsic,
		});

		// Get versioned data
		if (createData.isV21) {
			return createData.asV21;
		} else if (createData.isV30) {
			return createData.asV30;
		} else {
			console.error(`Unknown version of create body extrinsic!`);
		}
	}

	return null;
}

// Exports
export { handleBodyCreatedEvent };
