import * as v51 from '../../../types/v51';

export type CampaignCreationData = {
	org: Uint8Array;
	admin: Uint8Array;
	name: Uint8Array;
	target: bigint;
	deposit: bigint;
	expiry: number;
	protocol: v51.FlowProtocol;
	governance: v51.FlowGovernance;
	cid: Uint8Array;
	tokenSymbol: Uint8Array;
	tokenName: Uint8Array;
};
