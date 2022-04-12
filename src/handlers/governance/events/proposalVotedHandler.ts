// Imports
import { addressCodec, hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { createProposalVoter } from '../../../database/proposalVoter';

// Types
import { GameDaoGovernanceProposalVotedEvent } from '../../../types/events';
import { ProposalSimpleVoteData } from '../../../@types/pallets/governance/proposalSimpleVoteData';

// Functions
async function handleProposalVotedEvent(context: EventHandlerContext) {
	// Get versioned instance
	const proposalVotedEventData = new GameDaoGovernanceProposalVotedEvent(context);

	// Get id
	let voteData: ProposalSimpleVoteData | null = null;
	if (proposalVotedEventData.isV24) {
		voteData = {
			proposalId: hashToHexString(proposalVotedEventData.asV24[1]),
			voter: addressCodec.encode(proposalVotedEventData.asV24[0]),
			vote: !!proposalVotedEventData.asV24[2],
		};
	} else if (proposalVotedEventData.isV40) {
		voteData = {
			proposalId: hashToHexString(proposalVotedEventData.asV40[1]),
			voter: addressCodec.encode(proposalVotedEventData.asV40[0]),
			vote: proposalVotedEventData.asV40[2],
		};
	} else {
		console.error(`Unknown version of proposal voted event!`);
		return;
	}

	// Add voter
	await createProposalVoter(context.store, voteData);
}

// Exports
export { handleProposalVotedEvent };
