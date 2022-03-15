export type BodyCreationData = {
	controller: Uint8Array;
	treasury: Uint8Array;
	name: Uint8Array;
	cid: Uint8Array;
	body: number;
	access: number;
	feeModel: number;
	fee: bigint;
	govAsset: number;
	payAsset: number;
	memberLimit: bigint;
};
