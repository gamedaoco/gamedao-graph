// Imports
import { handleIdentitySetEvent } from './events/identitySetHandler';

// Types
import { IPallet } from '../../@types/palletHandler';

// Exports
export default {
	name: 'identity',
	extrinsicHandlers: [],
	eventHandlers: [
		{
			action: 'IdentitySet',
			handler: handleIdentitySetEvent,
		},
	],
} as IPallet;
