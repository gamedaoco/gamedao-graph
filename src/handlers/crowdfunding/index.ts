// Imports
import { handleCampaignCreatedEvent } from './events/campaignCreatedHandler';
import { handleCampaignContributed } from './events/campaignContributedHandler';

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
			handler: handleCampaignContributed,
		},
	],
} as IPallet;
