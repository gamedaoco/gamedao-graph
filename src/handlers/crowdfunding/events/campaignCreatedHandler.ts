// Imports
import { hashToHexString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { createCampaign } from '../../../database/campaign';

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

	// Get id
	let id;
	if (campaignCreatedEventData.isV21) {
		id = hashToHexString(campaignCreatedEventData.asV21[0]);
	} else {
		console.error(`Unknown version of campaign created event!`);
		return;
	}

	// Create campaign
	await createCampaign(context.store, id, context.extrinsic.signer, callCreateData);
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
