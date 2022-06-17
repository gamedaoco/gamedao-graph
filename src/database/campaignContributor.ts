// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { CampaignContributor } from '../model';

// Helpers
import { upsertIdentity } from './identity';
import { getCampaign }    from './campaign';
import { get }            from './helper';

// Functions
const getContributorId = (campaignId: string, contributor: string) => `${campaignId}-${contributor}`.toLowerCase();

function getCampaignContributor(
	store: Store,
	campaignId: string,
	contributor: string,
): Promise<CampaignContributor | null> {
	return get(store, CampaignContributor, getContributorId(campaignId, contributor), ['campaign', 'identity']);
}

async function addCampaignContributorContribution(
	store: Store,
	campaignId: string,
	contributor: string,
	contribution: bigint,
) {
	// Load contributor
	let campaignContributor = await getCampaignContributor(store, campaignId, contributor);
	if (!campaignContributor) {
		// Get campaign model
		const campaignModel = await getCampaign(store, campaignId);
		if (!campaignModel) return;

		// Create contributor
		campaignContributor = new CampaignContributor();

		campaignContributor.id = getContributorId(campaignId, contributor);
		campaignContributor.campaign = campaignModel;
		campaignContributor.address = contributor;
		campaignContributor.identity = await upsertIdentity(store, contributor, null);
		campaignContributor.contributed = contribution;
	} else {
		campaignContributor.contributed += contribution;
	}

	// Save contributor
	await store.save(campaignContributor);
}

// Exports
export { getCampaignContributor, addCampaignContributorContribution };
