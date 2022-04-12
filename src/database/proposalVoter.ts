// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { upsertIdentity } from './identity';
import { ProposalVoter } from '../model';
import { getProposal } from './proposal';
import { get } from './helper';

// Types
import { ProposalSimpleVoteData } from '../@types/pallets/governance/proposalSimpleVoteData';

// Functions
const getVoterId = (proposalId: string, voter: string) => `${proposalId}-${voter}`.toLowerCase();

function getProposalVoter(store: Store, proposalId: string, voter: string): Promise<ProposalVoter | null> {
	return get(store, ProposalVoter, getVoterId(proposalId, voter), ['proposal', 'identity']);
}

async function createProposalVoter(store: Store, voteData: ProposalSimpleVoteData) {
	// Check if exists
	const proposal = await getProposal(store, voteData.proposalId);
	if (!proposal) return null;

	let proposalVoter = await getProposalVoter(store, voteData.proposalId, voteData.voter);
	if (proposalVoter) return proposalVoter;

	// Create instance
	proposalVoter = new ProposalVoter();

	// Fill data
	proposalVoter.id = getVoterId(voteData.proposalId, voteData.voter);
	proposalVoter.proposal = proposal;

	proposalVoter.address = voteData.voter;
	proposalVoter.identity = await upsertIdentity(store, voteData.voter, null);

	proposalVoter.voted = BigInt(voteData.vote ? 1 : 0);

	// Save proposal voter
	await store.save(proposalVoter);

	// Update proposal aggregated data
	if (voteData.vote) {
		proposal.approvers += proposalVoter.voted;
	} else {
		proposal.deniers += proposalVoter.voted;
	}

	await store.save(proposal);

	return proposalVoter;
}

// Exports
export { createProposalVoter, getProposalVoter };
