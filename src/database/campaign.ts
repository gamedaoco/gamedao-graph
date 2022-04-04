// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { Campaign } from '../model';

// Helpers
import { get } from './helper';

// Functions
function getCampaign(store: Store, campaign: string): Promise<Campaign | null> {
	return get(store, Campaign, campaign);
}

// Exports
export { getCampaign };
