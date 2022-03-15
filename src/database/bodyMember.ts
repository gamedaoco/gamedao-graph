// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Models
import { Body, BodyMember } from '../model';
import { getBody } from './body';

// Functions
const getMemberId = (body: Body | string, member: string) =>
	`${body instanceof Body ? body.id : body}-${member}`.toLowerCase();

async function getBodyMember(store: Store, body: Body | string, member: string): Promise<BodyMember | null> {
	return (
		(await store.findOne(BodyMember, {
			where: {
				id: getMemberId(body, member),
			},
		})) ?? null
	);
}

async function addBodyMember(store: Store, body: Body | string, member: string) {
	// Check if address already member
	if (await getBodyMember(store, body, member)) return;

	// Get body model
	const bodyModel = await getBody(store, body);
	if (!bodyModel) return;

	// Create membership
	const bodyMember = new BodyMember();

	bodyMember.id = getMemberId(body, member);
	bodyMember.body = bodyModel;
	bodyMember.address = member;

	await store.save(bodyMember);
}

async function removeBodyMember(store: Store, body: Body | string, member: string) {
	// Check if address is member
	const bodyMember = await getBodyMember(store, body, member);
	if (!bodyMember) return;

	// Remove member
	await store.remove(bodyMember);
}

// Exports
export { getBodyMember, addBodyMember, removeBodyMember };
