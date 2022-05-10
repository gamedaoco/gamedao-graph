// Imports
import { handleOrgCreatedEvent } from './events/orgCreatedHandler';
import { handleAddMemberEvent } from './events/addMemberHandler';
import { handleRemoveMemberEvent } from './events/removeMemberHandler';

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
