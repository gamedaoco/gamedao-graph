// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { BodyMember } from '../model';

// Helpers
import { upsertIdentity } from './identity';
import { getBody } from './body';
import { get } from './helper';

// Functions
const getMemberId = (bodyId: string, member: string) => `${bodyId}-${member}`.toLowerCase();

function getBodyMember(store: Store, bodyId: string, member: string): Promise<BodyMember | null> {
	return get(store, BodyMember, getMemberId(bodyId, member), ['body', 'identity']);
}

async function addBodyMember(store: Store, bodyId: string, member: string) {
	// Check if address is already member
	if (await getBodyMember(store, bodyId, member)) return;

	// Get body model
	const bodyModel = await getBody(store, bodyId);
	if (!bodyModel) return;

	// Create membership
	const bodyMember = new BodyMember();

	bodyMember.id = getMemberId(bodyId, member);
	bodyMember.body = bodyModel;
	bodyMember.address = member;
	bodyMember.identity = await upsertIdentity(store, member, null);

	await store.save(bodyMember);
}

async function removeBodyMember(store: Store, body: string, member: string) {
	// Check if address is member
	const bodyMember = await getBodyMember(store, body, member);
	if (!bodyMember) return;

	// Remove member
	await store.remove(bodyMember);
}

// Exports
export { getBodyMember, addBodyMember, removeBodyMember };
