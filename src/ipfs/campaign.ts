// Imports
import { fetchJsonByCid } from './ipfs';

// Types
import { CampaignMetadata } from '../@types/ipfs/campaignMetadata';

// Functions
async function fetchCampaignMetadata(cid: string): Promise<CampaignMetadata | null> {
	return fetchJsonByCid(cid);
}

// Exports
export { fetchCampaignMetadata };
