// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { getBody } from '../../../database/body';
import { createProposal } from '../../../database/proposal';

// Types
import { GameDaoGovernanceProposalEvent } from '../../../types/events';
import { GameDaoGovernanceGeneralProposalCall } from '../../../types/calls';
import { ProposalCreationData } from '../../../@types/pallets/governance/proposalCreationData';

// Functions
async function handleProposalEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get creation data
	const callCreationData = getCreateData(context);
	if (!callCreationData) return;

	// Get body (and campaign)
	const contextId = hashToHexString(callCreationData.contextId);

	// Get body
	const body = await getBody(context.store, contextId);
	if (!body) {
		console.error(`Unknown body in proposal created event ${contextId}!`);
		return;
	}

	callCreationData.body = body;

	// Get versioned instance
	const proposalCreatedEventData = new GameDaoGovernanceProposalEvent(context);

	// Get id
	let id;
	if (proposalCreatedEventData.isV22) {
		id = hashToHexString(proposalCreatedEventData.asV22[1]);
	} else {
		console.error(`Unknown version of campaign created event!`);
		return;
	}

	// Create proposal
	await createProposal(context.store, id, context.extrinsic.signer, callCreationData);
}

function getCreateData(context: EventHandlerContext): ProposalCreationData | null {
	if (context.extrinsic) {
		// Get versioned extrinsic call
		const createData = new GameDaoGovernanceGeneralProposalCall({
			_chain: context._chain,
			block: context.block,
			extrinsic: context.extrinsic,
		});

		// Get versioned data
		if (createData.isV22) {
			return {
				proposalType: 0,
				...createData.asV22,
			};
		} else if (createData.isV24) {
			return {
				proposalType: 0,
				...createData.asV24,
			};
		} else {
			console.error(`Unknown version of create general proposal extrinsic!`);
		}
	} else {
		console.error(`Unknown create proposal extrinsic!`);
	}

	return null;
}

// Exports
export { handleProposalEvent };
