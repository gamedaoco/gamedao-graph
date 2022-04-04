// Imports
import { addressCodec, hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Types
import { GameDaoCrowdfundingCampaignContributedEvent } from '../../../types/events';
import { addCampaignContributorContribution } from '../../../database/campaignContributor';

// Functions
async function handleCampaignContributed(context: EventHandlerContext) {
	// Get versioned instance
	const campaignCreatedEventData = new GameDaoCrowdfundingCampaignContributedEvent(context);

	// Create model
	let campaignId: string | null = null;
	let contributorAddress: string | null = null;
	let contribution: bigint | null = null;

	// Load data
	if (campaignCreatedEventData.isV21) {
		campaignId = hashToHexString(campaignCreatedEventData.asV21[0]);
		contributorAddress = addressCodec.encode(campaignCreatedEventData.asV21[1]);
		contribution = campaignCreatedEventData.asV21[2];
	} else {
		console.error(`Unknown version of contribute campaign event!`);
		return;
	}

	// Create/Update contributor
	await addCampaignContributorContribution(context.store, campaignId, contributorAddress, contribution);
}

// Exports
export { handleCampaignContributed };
