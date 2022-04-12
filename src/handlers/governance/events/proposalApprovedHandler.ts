// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { ProposalState } from '../../../model';
import { updateProposalState } from '../../../database/proposal';

// Types
import { GameDaoGovernanceProposalApprovedEvent } from '../../../types/events';

// Functions
async function handleProposalApprovedEvent(context: EventHandlerContext) {
	// Get versioned instance
	const proposalExpiredEventData = new GameDaoGovernanceProposalApprovedEvent(context);

	// Get id
	let id;
	if (proposalExpiredEventData.isV27) {
		id = hashToHexString(proposalExpiredEventData.asV27);
	} else {
		console.error(`Unknown version of proposal approved event!`);
		return;
	}

	// Update proposal
	await updateProposalState(context.store, id, ProposalState.Approved);
}

// Exports
export { handleProposalApprovedEvent };
