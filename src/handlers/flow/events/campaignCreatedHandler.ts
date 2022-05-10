// Imports
import { hashToHexString } from '../../../utils';
import { fetchCampaignMetadata } from '../../../ipfs/campaign';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { createCampaign } from '../../../database/campaign';

// Types
import { FlowCampaignCreatedEvent } from '../../../types/events';
import { FlowCreateCampaignCall } from '../../../types/calls';
import { CampaignCreationData } from '../../../@types/pallets/crowdfunding/campaignCreationData';

// Functions
async function handleCampaignCreatedEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get versioned call
	const callCreateData = getCreateData(context);
	if (!callCreateData) return;

	// Get versioned instance
	const campaignCreatedEventData = new FlowCampaignCreatedEvent(context);

	// Get id
	let id;
	if (campaignCreatedEventData.isV51) {
		id = hashToHexString(campaignCreatedEventData.asV51.campaignId);
	} else {
		console.error(`Unknown version of campaign created event!`);
		return;
	}

	// Load body metadata
	const cid = callCreateData.cid.toString();
	const metadata = await fetchCampaignMetadata(cid);
	if (!metadata) {
		console.error(`Couldn't fetch metadata of campaign ${id} cid ${cid}`);
	}

	// Create campaign
	await createCampaign(context.store, id, context.extrinsic.signer, callCreateData, metadata);
}

function getCreateData(context: EventHandlerContext): CampaignCreationData | null {
	if (context.extrinsic) {
		// Get versioned extrinsic call
		const createData = new FlowCreateCampaignCall({
			_chain: context._chain,
			block: context.block,
			extrinsic: context.extrinsic,
		});

		// Get versioned data
		if (createData.isV51) {
			return createData.asV51;
		} else {
			console.error(`Unknown version of create campaign extrinsic!`);
		}
	}

	return null;
}

// Exports
export { handleCampaignCreatedEvent };
