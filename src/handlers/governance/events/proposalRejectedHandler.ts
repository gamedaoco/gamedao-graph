// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { ProposalState } from '../../../model';
import { updateProposalState } from '../../../database/proposal';

// Types
import { GameDaoGovernanceProposalRejectedEvent } from '../../../types/events';

// Functions
async function handleProposalRejectedEvent(context: EventHandlerContext) {
	// Get versioned instance
	const proposalExpiredEventData = new GameDaoGovernanceProposalRejectedEvent(context);

	// Get id
	let id;
	if (proposalExpiredEventData.isV27) {
		id = hashToHexString(proposalExpiredEventData.asV27);
	} else {
		console.error(`Unknown version of proposal rejected event!`);
		return;
	}

	// Update proposal
	await updateProposalState(context.store, id, ProposalState.Rejected);
}

// Exports
export { handleProposalRejectedEvent };
