// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { getCampaign } from '../../../database/campaign';
import { createProposal } from '../../../database/proposal';

// IPFS
import { fetchProposalMetadata } from '../../../ipfs/proposal';

// Types
import { GameDaoGovernanceProposalCreatedEvent } from '../../../types/events';
import { GameDaoGovernanceWithdrawProposalCall } from '../../../types/calls';
import { ProposalCreationData } from '../../../@types/pallets/governance/proposalCreationData';

// Functions
async function handleProposalCreatedEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get creation data
	const callCreationData = getCreateData(context);
	if (!callCreationData) return;

	// Get body (and campaign)
	const contextId = hashToHexString(callCreationData.contextId);

	// Load campaign
	const campaign = await getCampaign(context.store, contextId);
	if (!campaign) {
		console.error(`Unknown campaign in proposal created event ${contextId}!`);
		return;
	}

	callCreationData.campaign = campaign;
	callCreationData.body = campaign.body;

	// Get versioned instance
	const proposalCreatedEventData = new GameDaoGovernanceProposalCreatedEvent(context);

	// Get id
	let id;
	if (proposalCreatedEventData.isV21) {
		id = hashToHexString(proposalCreatedEventData.asV21[2]);
	} else {
		console.error(`Unknown version of campaign created event!`);
		return;
	}

	// Load proposal metadata
	const cid = callCreationData.cid.toString();
	const metadata = await fetchProposalMetadata(cid);
	if (!metadata) {
		console.error(`Couldn't fetch proposal metadata of ${id} cid ${cid}`);
		return;
	}

	// Create proposal
	await createProposal(context.store, id, context.extrinsic.signer, callCreationData, metadata);
}

function getCreateData(context: EventHandlerContext): ProposalCreationData | null {
	if (context.extrinsic) {
		// Get versioned extrinsic call
		const createData = new GameDaoGovernanceWithdrawProposalCall({
			_chain: context._chain,
			block: context.block,
			extrinsic: context.extrinsic,
		});

		// Get versioned data
		if (createData.isV22) {
			return {
				proposalType: 3,
				...createData.asV22,
			};
		} else if (createData.isV24) {
			return {
				proposalType: 3,
				...createData.asV24,
			};
		} else {
			console.error(`Unknown version of create withdrawal proposal extrinsic!`);
		}
	}

	return null;
}

// Exports
export { handleProposalCreatedEvent };
