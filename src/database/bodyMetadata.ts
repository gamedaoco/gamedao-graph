// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { BodyMetadata } from '../model';
import { get } from './helper';

// Types
import { BodyMetadata as BodyIpfsMetadata } from '../@types/ipfs/bodyMetadata';

// Functions
function getBodyMetadata(store: Store, bodyMetadataId: string): Promise<BodyMetadata | null> {
	return get(store, BodyMetadata, bodyMetadataId);
}

async function upsertBodyMetadata(store: Store, bodyMetadataId: string, data: BodyIpfsMetadata | null) {
	// Get metadata
	let bodyMetadata = await getBodyMetadata(store, bodyMetadataId);
	if (!bodyMetadata) {
		bodyMetadata = new BodyMetadata();
		bodyMetadata.id = bodyMetadataId;
	}

	// Fill data
	bodyMetadata.name = data?.name ?? '';
	bodyMetadata.description = data?.description ?? '';
	bodyMetadata.website = data?.website ?? '';
	bodyMetadata.email = data?.email ?? '';
	bodyMetadata.repo = data?.repo ?? '';
	bodyMetadata.logo = data?.logo ?? '';
	bodyMetadata.header = data?.header ?? '';

	// Save metadata
	await store.save(bodyMetadata);

	return bodyMetadata;
}

// Exports
export { getBodyMetadata, upsertBodyMetadata };
