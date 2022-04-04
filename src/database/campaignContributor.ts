// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { CampaignContributor } from '../model';

// Helpers
import { createOrUpdateIdentity } from './identity';
import { getCampaign } from './campaign';
import { get } from './helper';

// Functions
const getContributorId = (campaign: string, contributor: string) => `${campaign}-${contributor}`.toLowerCase();

function getCampaignContributor(
	store: Store,
	campaign: string,
	contributor: string,
): Promise<CampaignContributor | null> {
	return get(store, CampaignContributor, getContributorId(campaign, contributor));
}

async function addCampaignContributorContribution(
	store: Store,
	campaign: string,
	contributor: string,
	contribution: bigint,
) {
	// Load contributor
	let campaignContributor = await getCampaignContributor(store, campaign, contributor);
	if (!campaignContributor) {
		// Get campaign model
		const campaignModel = await getCampaign(store, campaign);
		if (!campaignModel) return;

		// Create contributor
		campaignContributor = new CampaignContributor();

		campaignContributor.id = getContributorId(campaign, contributor);
		campaignContributor.campaign = campaignModel;
		campaignContributor.address = contributor;
		campaignContributor.identity = await createOrUpdateIdentity(store, contributor, null);
		campaignContributor.contributed = contribution;
		console.log('set', contributor, contribution);
	} else {
		campaignContributor.contributed += contribution;
		console.log('add', contributor, contribution);
	}

	// Save contributor
	await store.save(campaignContributor);
}

// Exports
export { getCampaignContributor, addCampaignContributorContribution };
