// Imports
import { addressCodec, hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { Campaign } from '../../../model';
import { getBody } from '../../../database/body';

// Types
import { GameDaoCrowdfundingCampaignCreatedEvent } from '../../../types/events';
import { GameDaoCrowdfundingCreateCall } from '../../../types/calls';
import { CampaignCreationData } from '../../../@types/pallets/crowdfunding/campaignCreationData';

// Functions
async function handleCampaignCreatedEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get versioned call
	const callCreateData = getCreateData(context);
	if (!callCreateData) return;

	// Get versioned instance
	const campaignCreatedEventData = new GameDaoCrowdfundingCampaignCreatedEvent(context);

	// Create campaign
	const campaign = new Campaign();

	// Get id
	if (campaignCreatedEventData.isV21) {
		campaign.id = hashToHexString(campaignCreatedEventData.asV21[0]);
	} else {
		console.error(`Unknown version of campaign created event!`);
		return;
	}

	// Get body
	const bodyHash = hashToHexString(callCreateData.org);
	const body = await getBody(context.store, bodyHash);
	if (!body) {
		console.error(`Unknown organization ${bodyHash} for campaign ${campaign.id}`);
		return;
	}

	campaign.body = body;
	campaign.admin = addressCodec.encode(callCreateData.admin);
	campaign.creator = context.extrinsic.signer;
	campaign.target = callCreateData.target;
	campaign.deposit = callCreateData.deposit;
	campaign.expiry = callCreateData.expiry;
	campaign.protocol = callCreateData.protocol;
	campaign.governance = callCreateData.governance;
	campaign.cid = callCreateData.cid.toString();
	campaign.tokenSymbol = callCreateData.tokenSymbol.toString();
	campaign.tokenName = callCreateData.tokenName.toString();

	await context.store.save(campaign);
}

function getCreateData(context: EventHandlerContext): CampaignCreationData | null {
	if (context.extrinsic) {
		// Get versioned extrinsic call
		const createData = new GameDaoCrowdfundingCreateCall({
			_chain: context._chain,
			block: context.block,
			extrinsic: context.extrinsic,
		});

		// Get versioned data
		if (createData.isV21) {
			return createData.asV21;
		} else {
			console.error(`Unknown version of create campaign extrinsic!`);
		}
	}

	return null;
}

// Exports
export { handleCampaignCreatedEvent };
