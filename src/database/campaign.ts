// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { Campaign } from '../model';
import { getBody } from './body';
import { upsertCampaignMetadata } from './campaignMetadata';
import { createOrUpdateIdentity } from './identity';

// Helpers
import { get } from './helper';
import { addressCodec, hashToHexString } from '../utils';

// Types
import { CampaignCreationData } from '../@types/pallets/crowdfunding/campaignCreationData';
import { CampaignMetadata as CampaignIpfsMetadata } from '../@types/ipfs/campaignMetadata';

// Functions
function getCampaign(store: Store, campaignId: string): Promise<Campaign | null> {
	return get(store, Campaign, campaignId, ['body', 'creatorIdentity', 'metadata']);
}

async function createCampaign(
	store: Store,
	campaignId: string,
	signer: string,
	data: CampaignCreationData,
	metadata: CampaignIpfsMetadata,
): Promise<Campaign | null> {
	// Check if exists
	let campaign = await getCampaign(store, campaignId);
	if (campaign) return campaign;

	// Get body
	const bodyId = hashToHexString(data.org);
	const body = await getBody(store, bodyId);
	if (!body) {
		console.error(`Unknown organization ${bodyId} for campaign ${campaignId}`);
		return null;
	}

	// Create campaign
	campaign = new Campaign();

	// Fill data
	campaign.id = campaignId;
	campaign.body = body;
	campaign.admin = addressCodec.encode(data.admin);
	campaign.adminIdentity = await createOrUpdateIdentity(store, campaign.admin, null);
	campaign.creator = signer;
	campaign.creatorIdentity = await createOrUpdateIdentity(store, signer, null);
	campaign.target = data.target;
	campaign.deposit = data.deposit;
	campaign.expiry = data.expiry;
	campaign.protocol = data.protocol;
	campaign.governance = data.governance;
	campaign.cid = data.cid.toString();
	campaign.tokenSymbol = data.tokenSymbol.toString();
	campaign.tokenName = data.tokenName.toString();

	campaign.isFinished = false;
	campaign.isFunded = false;

	campaign.metadata = await upsertCampaignMetadata(store, campaign.cid, metadata);

	// Save campaign
	await store.save(campaign);

	return campaign;
}

// Exports
export { createCampaign, getCampaign };
