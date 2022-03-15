// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Models
import { Body, BodyMember } from '../model';

// Functions
async function getBody(store: Store, body: Body | string): Promise<Body | null> {
	if (!(body instanceof Body)) {
		return (await store.findOne(Body, body)) ?? null;
	}

	return body;
}

// Exports
export { getBody };
