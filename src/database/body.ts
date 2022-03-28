// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Models
import { Body } from '../model';

// Functions
async function getBody(store: Store, body: string): Promise<Body | null> {
	return (await store.findOne(Body, body)) ?? null;
}

// Exports
export { getBody };
