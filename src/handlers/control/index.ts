// Imports
import { handleBodyCreatedEvent } from './events/bodyCreatedHandler';

// Types
import { IPallet } from '../../@types/palletHandler';

// Exports
export default {
	name: 'gameDaoControl',
	extrinsicHandlers: [
		{
			action: 'create',
		},
	],
	eventHandlers: [
		{
			action: 'BodyCreated',
			handler: handleBodyCreatedEvent,
		},
	],
} as IPallet;
