// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { addBodyMember } from '../../../database/bodyMember';
import { createBody } from '../../../database/body';

// Types
import { BodyCreationData } from '../../../@types/pallets/control/bodyCreationData';
import { GameDaoControlBodyCreatedEvent } from '../../../types/events';
import { GameDaoControlCreateCall } from '../../../types/calls';

// Logic
async function handleBodyCreatedEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get versioned call
	const callCreateData = getCreateData(context);
	if (!callCreateData) return;

	// Get versioned instance
	const bodyCreatedEventData = new GameDaoControlBodyCreatedEvent(context);

	// Get id
	let id;
	if (bodyCreatedEventData.isV21) {
		id = hashToHexString(bodyCreatedEventData.asV21[1]);
	} else {
		console.error(`Unknown version of body created event!`);
		return;
	}

	// Create body
	const body = await createBody(context.store, id, context.extrinsic.signer, callCreateData);

	// Add initial member (creator of DAO)
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
