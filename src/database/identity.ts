// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Models
import { Identity } from '../model';
import { IdentityUpsertData } from '../@types/identity';

// Functions
async function getIdentity(store: Store, identity: string): Promise<Identity | null> {
	return (await store.findOne(Identity, identity)) ?? null;
}

async function createOrUpdateIdentity(
	store: Store,
	identity: string,
	data: IdentityUpsertData | null,
): Promise<Identity> {
	/*
	 * 1) Get existing identity
	 * 2) If not found, create new one
	 */
	let entity = await getIdentity(store, identity);
	if (!entity) {
		entity = new Identity();
		entity.id = identity;
	}

	// Set data
	if (data) {
		entity.displayName = data.displayName;
		entity.legalName = data.legalName;
		entity.email = data.email;
		entity.riot = data.riot;
		entity.image = data.image;
		entity.twitter = data.twitter;
	}

	// Save identity
	await store.save(entity);

	return entity;
}

// Exports
export { getIdentity, createOrUpdateIdentity };
