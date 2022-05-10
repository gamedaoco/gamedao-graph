// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { Campaign } from '../model';
import { upsertCampaignMetadata } from './campaignMetadata';
import { upsertIdentity } from './identity';
import { getOrganization } from './organization';

// Helpers
import { get } from './helper';
import { addressCodec, hashToHexString } from '../utils';

// Types
import { CampaignCreationData } from '../@types/pallets/crowdfunding/campaignCreationData';
import { CampaignMetadata as CampaignIpfsMetadata } from '../@types/ipfs/campaignMetadata';

// Functions
function getCampaign(store: Store, campaignId: string): Promise<Campaign | null> {
	return get(store, Campaign, campaignId, ['organization', 'creatorIdentity', 'metadata']);
}

async function createCampaign(
	store: Store,
	campaignId: string,
	signer: string,
	data: CampaignCreationData,
	metadata: CampaignIpfsMetadata | null,
): Promise<Campaign | null> {
	// Check if exists
	let campaign = await getCampaign(store, campaignId);
	if (campaign) return campaign;

	// Get organization
	const organizationId = hashToHexString(data.org);
	const organization = await getOrganization(store, organizationId);
	if (!organization) {
		console.error(`Unknown organization ${organizationId} for campaign ${campaignId}`);
		return null;
	}

	// Create campaign
	campaign = new Campaign();

	// Fill data
	campaign.id = campaignId;
	campaign.organization = organization;
	campaign.admin = addressCodec.encode(data.admin);
	campaign.adminIdentity = await upsertIdentity(store, campaign.admin, null);
	campaign.creator = signer;
	campaign.creatorIdentity = await upsertIdentity(store, signer, null);
	campaign.target = data.target;
	campaign.deposit = data.deposit;
	campaign.expiry = data.expiry;
	campaign.protocol = data.protocol.__kind;
	campaign.governance = data.governance.__kind;
	campaign.cid = data.cid.toString();
	campaign.tokenSymbol = data.tokenSymbol.toString();
	campaign.tokenName = data.tokenName.toString();

	campaign.state = 'Active';

	campaign.metadata = await upsertCampaignMetadata(store, campaign.cid, metadata);

	// Save campaign
	await store.save(campaign);

	return campaign;
}

// Exports
export { createCampaign, getCampaign };
