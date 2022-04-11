// Imports
import { handleProposalCreatedEvent } from './events/proposalCreatedHandler';
import { handleProposalEvent } from './events/proposalHandler';

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
	],
} as IPallet;
