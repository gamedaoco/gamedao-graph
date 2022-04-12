// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { CampaignState } from '../../../model';
import { getCampaign } from '../../../database/campaign';

// Types
import { GameDaoCrowdfundingCampaignFailedEvent } from '../../../types/events';

// Functions
async function handleCampaignFailedEvent(context: EventHandlerContext) {
	// Get versioned instance
	const campaignFailedEventData = new GameDaoCrowdfundingCampaignFailedEvent(context);

	// Define data
	let campaignId: string | null = null;

	// Load data
	if (campaignFailedEventData.isV21) {
		campaignId = hashToHexString(campaignFailedEventData.asV21[0]);
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

	campaign.state = CampaignState.Failed;

	// Save campaign
	await context.store.save(campaign);
}

// Exports
export { handleCampaignFailedEvent };
