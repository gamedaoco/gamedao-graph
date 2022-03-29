// Imports
import { handleCampaignCreatedEvent } from './events/campaignCreatedHandler';

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
	],
} as IPallet;
