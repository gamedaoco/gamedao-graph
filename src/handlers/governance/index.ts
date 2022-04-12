// Imports
import { handleProposalCreatedEvent } from './events/proposalCreatedHandler';
import { handleProposalEvent } from './events/proposalHandler';
import { handleProposalVotedEvent } from './events/proposalVotedHandler';
import { handleProposalExpiredEvent } from './events/proposalExpiredHandler';
import { handleProposalRejectedEvent } from './events/proposalRejectedHandler';
import { handleProposalApprovedEvent } from './events/proposalApprovedHandler';

// Types
import { IPallet } from '../../@types/palletHandler';

// Exports
export default {
	name: 'gameDaoGovernance',
	extrinsicHandlers: [],
	eventHandlers: [
		{
			action: 'Proposal',
			handler: handleProposalEvent,
		},
		{
			action: 'ProposalCreated',
			handler: handleProposalCreatedEvent,
		},
		{
			action: 'ProposalVoted',
			handler: handleProposalVotedEvent,
		},
		{
			action: 'ProposalExpired',
			handler: handleProposalExpiredEvent,
		},
		{
			action: 'ProposalRejected',
			handler: handleProposalRejectedEvent,
		},
		{
			action: 'ProposalApproved',
			handler: handleProposalApprovedEvent,
		},
	],
} as IPallet;
