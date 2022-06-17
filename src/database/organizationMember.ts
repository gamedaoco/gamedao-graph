// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { OrganizationMember } from '../model';

// Helpers
import { upsertIdentity }  from './identity';
import { getOrganization } from './organization';
import { get }             from './helper';

// Functions
const getMemberId = (organizationId: string, member: string) => `${organizationId}-${member}`.toLowerCase();

function getOrganizationMember(
	store: Store,
	organizationId: string,
	member: string,
): Promise<OrganizationMember | null> {
	return get(store, OrganizationMember, getMemberId(organizationId, member), ['organization', 'identity']);
}

async function addOrganizationMember(store: Store, organizationId: string, member: string) {
	// Check if address is already member
	if (await getOrganizationMember(store, organizationId, member)) return;

	// Get organization model
	const organizationModel = await getOrganization(store, organizationId);
	if (!organizationModel) return;

	// Create membership
	const organizationMember = new OrganizationMember();

	organizationMember.id = getMemberId(organizationId, member);
	organizationMember.organization = organizationModel;
	organizationMember.address = member;
	organizationMember.identity = await upsertIdentity(store, member, null);

	await store.save(organizationMember);
}

async function removeOrganizationMember(store: Store, organization: string, member: string) {
	// Check if address is member
	const organizationMember = await getOrganizationMember(store, organization, member);
	if (!organizationMember) return;

	// Remove member
	await store.remove(organizationMember);
}

// Exports
export { getOrganizationMember, addOrganizationMember, removeOrganizationMember };
