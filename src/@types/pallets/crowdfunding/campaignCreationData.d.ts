export type CampaignCreationData = {
	org: Uint8Array;
	admin: Uint8Array;
	name: Uint8Array;
	target: bigint;
	deposit: bigint;
	expiry: number;
	protocol: number;
	governance: number;
	cid: Uint8Array;
	tokenSymbol: Uint8Array;
	tokenName: Uint8Array;
};
