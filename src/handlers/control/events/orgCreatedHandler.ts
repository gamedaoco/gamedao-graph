// Imports
import { hashToHexString } from '../../../utils';
import { fetchOrganizationMetadata } from '../../../ipfs/organization';

// Database
import { createOrganization } from '../../../database/organization';
import { addOrganizationMember } from '../../../database/organizationMember';

// Types
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { OrganizationCreationData } from '../../../@types/pallets/control/orgCreationData';
import { ControlOrgCreatedEvent } from '../../../types/events';
import { ControlCreateOrgCall } from '../../../types/calls';
import { OrganizationMetadata } from '../../../@types/ipfs/organizationMetadata';

// Logic
async function handleOrgCreatedEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	// Get versioned call
	const callCreateData = getCreateData(context);
	if (!callCreateData) return;

	// Get versioned instance
	const organizationCreatedEventData = new ControlOrgCreatedEvent(context);

	// Get id
	let id;
	if (organizationCreatedEventData.isV51) {
		id = hashToHexString(organizationCreatedEventData.asV51.orgId);
		callCreateData.treasury = organizationCreatedEventData.asV51.treasuryId;
	} else {
		console.error(`Unknown version of organization created event!`);
		return;
	}

	// Load organization metadata
	let metadata: OrganizationMetadata | null = null;
	try {
		const cid = callCreateData.cid.toString();
		if (cid.length > 46) {
			console.error(`Couldn't fetch metadata of organization ${id}, invalid cid`);
			callCreateData.cid = new Uint8Array();
		} else {
			metadata = await fetchOrganizationMetadata(cid);
			if (!metadata) {
				console.error(`Couldn't fetch metadata of organization ${id}`);
			}
		}
	} catch (e) {
	}

	// Create body
	const organization = await createOrganization(
		context.store,
		id,
		context.extrinsic.signer,
		callCreateData,
		metadata,
	);

	// Add initial member (creator of DAO)
	await addOrganizationMember(context.store, organization.id, organization.creator);
}

function getCreateData(context: EventHandlerContext): OrganizationCreationData | null {
	if (context.extrinsic) {
		// Get versioned extrinsic call
		const createData = new ControlCreateOrgCall({
			_chain: context._chain,
			block: context.block,
			extrinsic: context.extrinsic,
		});

		// Get versioned data
		if (createData.isV51) {
			return createData.asV51;
		} else {
			console.error(`Unknown version of create organization extrinsic!`);
		}
	}

	return null;
}

// Exports
export { handleOrgCreatedEvent };
