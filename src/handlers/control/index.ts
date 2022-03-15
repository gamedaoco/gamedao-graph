// Imports
import { handleBodyCreatedEvent } from './events/bodyCreatedHandler';
import { handleAddMemberEvent } from './events/addMemberHandler';
import { handleRemoveMemberEvent } from './events/removeMemberHandler';

// Types
import { IPallet } from '../../@types/palletHandler';

// Exports
export default {
	name: 'gameDaoControl',
	extrinsicHandlers: [],
	eventHandlers: [
		{
			action: 'BodyCreated',
			handler: handleBodyCreatedEvent,
		},
		{
			action: 'AddMember',
			handler: handleAddMemberEvent,
		},
		{
			action: 'RemoveMember',
			handler: handleRemoveMemberEvent,
		},
	],
} as IPallet;
