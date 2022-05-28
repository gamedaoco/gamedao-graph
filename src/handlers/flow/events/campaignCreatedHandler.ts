// Imports
import { hashToHexString } from '../../../utils';
import { fetchCampaignMetadata } from '../../../ipfs/campaign';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database
import { createCampaign } from '../../../database/campaign';

// Helpers
import { isCIDValid } from '../../../helpers';

// Types
import { FlowCampaignCreatedEvent } from '../../../types/events';
import { FlowCreateCampaignCall } from '../../../types/calls';
import { CampaignCreationData } from '../../../@types/pallets/crowdfunding/campaignCreationData';
import { CampaignMetadata } from '../../../@types/ipfs/campaignMetadata';

// Functions
async function handleCampaignCreatedEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get versioned call
	const callCreateData = getCreateData(context);
	if (!callCreateData) return;

	callCreateData.blockNumber = context.block.height;

	// Get versioned instance
	const campaignCreatedEventData = new FlowCampaignCreatedEvent(context);

	// Get id
	let id;
	if (campaignCreatedEventData.isV51) {
		id = hashToHexString(campaignCreatedEventData.asV51.campaignId);
	} else {
		console.error(`Unknown version of campaign created event!`);
		return;
	}

	// Load body metadata
	let metadata: CampaignMetadata | null = null;
	try {
		const cid = callCreateData.cid.toString();
		if (!isCIDValid(cid)) {
			console.error(`Couldn't fetch metadata of campaign ${id}, invalid cid`);
			callCreateData.cid = new Uint8Array();
		} else {
			metadata = await fetchCampaignMetadata(cid);
			if (!metadata) {
				console.error(`Couldn't fetch metadata of campaign ${id}`);
			}
		}
	} catch (e) {}

	// Create campaign
	await createCampaign(context.store, id, context.extrinsic.signer, callCreateData, metadata);
}

function getCreateData(context: EventHandlerContext): CampaignCreationData | null {
	if (context.extrinsic) {
		// Get versioned extrinsic call
		const createData = new FlowCreateCampaignCall({
			_chain: context._chain,
			block: context.block,
			extrinsic: context.extrinsic,
		});

		// Get versioned data
		if (createData.isV51) {
			const v51Data = createData.asV51;
			return {
				org: v51Data.org,
				admin: v51Data.admin,
				name: v51Data.name,
				target: v51Data.target,
				deposit: v51Data.deposit,
				expiry: v51Data.expiry,
				protocol: v51Data.protocol,
				governance: v51Data.governance,
				cid: v51Data.cid,
				tokenSymbol: v51Data.tokenSymbol,
				tokenName: v51Data.tokenName,
			};
		} else if (createData.isV52) {
			const v52Data = createData.asV52;
			return {
				org: v52Data.orgId,
				admin: v52Data.adminId,
				name: v52Data.name,
				target: v52Data.target,
				deposit: v52Data.deposit,
				expiry: v52Data.expiry,
				protocol: v52Data.protocol,
				governance: v52Data.governance,
				cid: v52Data.cid,
				tokenSymbol: v52Data.tokenSymbol,
				tokenName: v52Data.tokenName,
			};
		} else {
			console.error(`Unknown version of create campaign extrinsic!`);
		}
	}

	return null;
}

// Exports
export { handleCampaignCreatedEvent };
