// Imports
import { addressCodec, hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { removeBodyMember } from '../../../database/bodyMember';

// Types
import { GameDaoControlRemoveMemberEvent } from '../../../types/events';

// Logic
async function handleRemoveMemberEvent(context: EventHandlerContext) {
	// Get versioned instance
	const removeMemberData = new GameDaoControlRemoveMemberEvent(context);

	if (removeMemberData.isV21) {
		await removeBodyMember(
			context.store,
			hashToHexString(removeMemberData.asV21[0]),
			addressCodec.encode(removeMemberData.asV21[1]),
		);
	} else {
		console.error(`Unknown version of body created event!`);
	}
}

// Exports
export { handleRemoveMemberEvent };
