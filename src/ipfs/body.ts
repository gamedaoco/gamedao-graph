// Imports
import { fetchJsonByCid } from './ipfs';

// Types
import { BodyMetadata } from '../@types/ipfs/bodyMetadata';

// Functions
async function fetchBodyMetaData(cid: string): Promise<BodyMetadata | null> {
	return fetchJsonByCid(cid);
}

// Exports
export { fetchBodyMetaData };
