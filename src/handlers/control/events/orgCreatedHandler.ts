// Imports
import { hashToHexString } from '../../../utils';
import { fetchOrganizationMetadata } from '../../../ipfs/organization';

// Database
import { createOrganization } from '../../../database/organization';

// Types
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { OrganizationCreationData } from '../../../@types/pallets/control/orgCreationData';
import { ControlOrgCreatedEvent } from '../../../types/events';
import { ControlCreateOrgCall } from '../../../types/calls';

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
	} else {
		console.error(`Unknown version of organization created event!`);
		return;
	}

	// Load organization metadata
	const cid = callCreateData.cid.toString();
	const metadata = await fetchOrganizationMetadata(cid);
	if (!metadata) {
		console.error(`Couldn't fetch metadata of organization ${id} cid ${cid}`);
		return;
	}

	// Create body
	/*const body = */ await createOrganization(context.store, id, context.extrinsic.signer, callCreateData, metadata);

	// Add initial member (creator of DAO)
	//await addBodyMember(context.store, body.id, body.creator);
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