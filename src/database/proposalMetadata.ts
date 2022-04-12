// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { ProposalMetadata } from '../model';
import { get } from './helper';

// Types
import { ProposalMetadata as ProposalIpfsMetadata } from '../@types/ipfs/proposalMetadata';

// Functions
function getProposalMetadata(store: Store, proposalMetadataId: string): Promise<ProposalMetadata | null> {
	return get(store, ProposalMetadata, proposalMetadataId);
}

async function upsertProposalMetadata(store: Store, proposalMetadataId: string, data: ProposalIpfsMetadata | null) {
	// Get metadata
	let proposalMetadata = await getProposalMetadata(store, proposalMetadataId);
	if (!proposalMetadata) {
		proposalMetadata = new ProposalMetadata();
		proposalMetadata.id = proposalMetadataId;
	}

	// Fill data
	proposalMetadata.title = data?.title ?? '';
	proposalMetadata.description = data?.description ?? '';

	// Save metadata
	await store.save(proposalMetadata);

	return proposalMetadata;
}

// Exports
export { getProposalMetadata, upsertProposalMetadata };
