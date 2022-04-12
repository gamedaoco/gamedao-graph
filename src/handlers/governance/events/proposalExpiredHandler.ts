// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { ProposalState } from '../../../model';
import { updateProposalState } from '../../../database/proposal';

// Types
import { GameDaoGovernanceProposalExpiredEvent } from '../../../types/events';

// Functions
async function handleProposalExpiredEvent(context: EventHandlerContext) {
	// Get versioned instance
	const proposalExpiredEventData = new GameDaoGovernanceProposalExpiredEvent(context);

	// Get id
	let id;
	if (proposalExpiredEventData.isV33) {
		id = hashToHexString(proposalExpiredEventData.asV33);
	} else {
		console.error(`Unknown version of proposal expired event!`);
		return;
	}

	// Update proposal
	await updateProposalState(context.store, id, ProposalState.Expired);
}

// Exports
export { handleProposalExpiredEvent };
