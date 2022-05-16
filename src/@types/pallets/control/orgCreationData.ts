import * as v51 from '../../../types/v51';

export type OrganizationCreationData = {
	controller: Uint8Array;
	treasury?: Uint8Array;
	name: Uint8Array;
	cid: Uint8Array;

	orgType: v51.OrgType;
	access: v51.AccessModel;
	feeModel: v51.FeeModel;

	fee: bigint;
	govAsset: number;
	payAsset: number;
	memberLimit: bigint;

	blockNumber?: number;
};
