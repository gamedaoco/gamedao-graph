// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { getCampaign } from '../../../database/campaign';

// Types
import { FlowCampaignFailedEvent } from '../../../types/events';

// Functions
async function handleCampaignFailedEvent(context: EventHandlerContext) {
	// Get versioned instance
	const campaignFailedEventData = new FlowCampaignFailedEvent(context);

	// Define data
	let campaignId: string | null = null;

	// Load data
	if (campaignFailedEventData.isV51) {
		campaignId = hashToHexString(campaignFailedEventData.asV51.campaignId);
	} else {
		console.error(`Unknown version of failed campaign event!`);
		return;
	}

	// Get campaign
	const campaign = await getCampaign(context.store, campaignId);
	if (!campaign) {
		console.error(`Unknown campaign ${campaignId}!`);
		return;
	}

	campaign.state = 'Failed';

	// Save campaign
	await context.store.save(campaign);
}

// Exports
export { handleCampaignFailedEvent };
