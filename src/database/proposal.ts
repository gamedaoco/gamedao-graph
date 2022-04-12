// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { Proposal, ProposalState, Body, ProposalTypeGeneralData, ProposalTypeWithdrawalData } from '../model';
import { upsertIdentity } from './identity';
import { upsertProposalMetadata } from './proposalMetadata';
import { get } from './helper';

// Types
import { ProposalCreationData } from '../@types/pallets/governance/proposalCreationData';
import { ProposalMetadata } from '../@types/ipfs/proposalMetadata';

// Functions
function getProposal(store: Store, proposalId: string): Promise<Proposal | null> {
	return get(store, Proposal, proposalId, ['body', 'campaign', 'creatorIdentity']);
}

async function createProposal(
	store: Store,
	proposalId: string,
	signer: string,
	data: ProposalCreationData,
	metadata: ProposalMetadata,
) {
	// Check if exists
	let proposal = await getProposal(store, proposalId);
	if (proposal) return proposal;

	// Create instance
	proposal = new Proposal();

	// Fill data
	proposal.id = proposalId;

	proposal.body = data.body as Body;
	proposal.campaign = data.campaign;

	proposal.creator = signer;
	proposal.creatorIdentity = await upsertIdentity(store, signer, null);

	proposal.cid = data.cid.toString();

	proposal.type = data.proposalType;

	switch (proposal.type) {
		case 0:
			proposal.data = new ProposalTypeGeneralData({
				type: 0,
			});
			break;
		case 3:
			proposal.data = new ProposalTypeWithdrawalData({
				type: 3,
				amount: data.amount,
			});
			break;
	}

	proposal.votingType = 0; // ToDo: only simple vote currently
	proposal.approvers = BigInt(0);
	proposal.deniers = BigInt(0);

	proposal.state = ProposalState.Voting;

	proposal.metadata = await upsertProposalMetadata(store, proposal.id, metadata);

	proposal.expiryBlock = data.expiry;

	// Save proposal
	await store.save(proposal);

	return proposal;
}

async function updateProposalState(store: Store, proposalId: string, state: ProposalState) {
	// Get proposal
	let proposal = await getProposal(store, proposalId);
	if (!proposal) return proposal;

	// Update
	proposal.state = state;

	// Save proposal
	await store.save(proposal);

	return proposal;
}

// Exports
export { createProposal, updateProposalState, getProposal };
