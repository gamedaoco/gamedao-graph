// Imports
import { addressCodec, hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Models
import { addBodyMember } from '../../../database/bodyMember';

// Types
import { GameDaoControlAddMemberEvent } from '../../../types/events';

// Logic
async function handleAddMemberEvent(context: EventHandlerContext) {
	// Get versioned instance
	const addMemberData = new GameDaoControlAddMemberEvent(context);

	if (addMemberData.isV21) {
		await addBodyMember(
			context.store,
			hashToHexString(addMemberData.asV21[0]),
			addressCodec.encode(addMemberData.asV21[1]),
		);
	} else {
		console.error(`Unknown version of body created event!`);
	}
}

// Exports
export { handleAddMemberEvent };
