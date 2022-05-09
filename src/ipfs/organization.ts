// Imports
import { fetchJsonByCid } from './ipfs';

// Types
import { OrganizationMetadata } from '../@types/ipfs/organizationMetadata';

// Functions
async function fetchOrganizationMetadata(cid: string): Promise<OrganizationMetadata | null> {
	return fetchJsonByCid(cid);
}

// Exports
export { fetchOrganizationMetadata };
