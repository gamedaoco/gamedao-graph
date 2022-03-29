// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { Body } from '../model';

// Helpers
import { get } from './helper';

// Functions
function getBody(store: Store, body: string): Promise<Body | null> {
	return get(store, Body, body);
}

// Exports
export { getBody };
