// Imports
import { handleCampaignCreatedEvent } from './events/campaignCreatedHandler';
import { handleCampaignContributedEvent } from './events/campaignContributedHandler';
import { handleCampaignFailedEvent } from './events/campaignFailedHandler';
import { handleCampaignFinalizedEvent } from './events/campaignFinalizedHandler';

// Types
import { IPallet } from '../../@types/palletHandler';

// Exports
export default {
	name: 'gameDaoCrowdfunding',
	extrinsicHandlers: [],
	eventHandlers: [
		{
			action: 'CampaignCreated',
			handler: handleCampaignCreatedEvent,
		},
		{
			action: 'CampaignContributed',
			handler: handleCampaignContributedEvent,
		},
		{
			action: 'CampaignFailed',
			handler: handleCampaignFailedEvent,
		},
		{
			action: 'CampaignFinalized',
			handler: handleCampaignFinalizedEvent,
		},
	],
} as IPallet;
