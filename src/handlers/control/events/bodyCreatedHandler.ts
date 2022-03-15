// Imports
import { addressCodec, hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Models
import { Body } from '../../../model';

// Types
import { BodyCreationData } from '../../../@types/pallets/control/bodyCreationData';
import { GameDaoControlBodyCreatedEvent } from '../../../types/events';
import { GameDaoControlCreateCall } from '../../../types/calls';

// Logic
async function handleBodyCreatedEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get versioned extrinsic call
	const callCreateData = getCreateData(context);
	if (!callCreateData) return;

	// Get versioned instance
	const bodyCreatedData = new GameDaoControlBodyCreatedEvent(context);

	// Create body
	const body = new Body();

	body.creator = context.extrinsic.signer;
	body.controller = addressCodec.encode(callCreateData.controller);
	body.treasury = addressCodec.encode(callCreateData.treasury);
	body.name = callCreateData.name.toString();
	body.cid = callCreateData.cid.toString();
	body.body = callCreateData.body;
	body.access = callCreateData.access;
	body.feeModel = callCreateData.feeModel;
	body.fee = callCreateData.fee;
	body.govAsset = callCreateData.govAsset;
	body.payAsset = callCreateData.payAsset;
	body.memberLimit = callCreateData.memberLimit;

	// Get id
	if (bodyCreatedData.isV21) {
		body.id = hashToHexString(bodyCreatedData.asV21[1]);
	}

	await context.store.save(body);
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
		}
	}

	return null;
}

// Exports
export { handleBodyCreatedEvent };
