// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { getCampaign } from '../../../database/campaign';

// Types
import { GameDaoCrowdfundingCampaignFinalizedEvent } from '../../../types/events';

// Functions
async function handleCampaignFinalizedEvent(context: EventHandlerContext) {
	// Get versioned instance
	const campaignFinalizedEventData = new GameDaoCrowdfundingCampaignFinalizedEvent(context);

	// Define data
	let campaignId: string | null = null;

	// Load data
	if (campaignFinalizedEventData.isV21) {
		campaignId = hashToHexString(campaignFinalizedEventData.asV21[0]);
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

	campaign.isFunded = true;
	campaign.isFinished = true;

	// Save campaign
	await context.store.save(campaign);
}

// Exports
export { handleCampaignFinalizedEvent };
