// Imports
import { handleOrgCreatedEvent } from './events/orgCreatedHandler';

// Types
import { IPallet } from '../../@types/palletHandler';

// Exports
export default {
	name: 'control',
	extrinsicHandlers: [],
	eventHandlers: [
		{
			action: 'OrgCreated',
			handler: handleOrgCreatedEvent,
		},
	],
} as IPallet;
