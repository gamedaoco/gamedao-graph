// Imports
import { fetchJsonByCid } from './ipfs';

// Types
import { ProposalMetadata } from '../@types/ipfs/proposalMetadata';

// Functions
async function fetchProposalMetadata(cid: string): Promise<ProposalMetadata | null> {
	return fetchJsonByCid(cid);
}

// Exports
export { fetchProposalMetadata };
