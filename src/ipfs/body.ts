// Imports
import { fetchJsonByCid } from './ipfs';

// Types
import { BodyMetadata } from '../@types/ipfs/bodyMetadata';

// Functions
async function fetchBodyMetadata(cid: string): Promise<BodyMetadata | null> {
	return fetchJsonByCid(cid);
}

// Exports
export { fetchBodyMetadata };
