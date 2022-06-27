// Imports
import { addressCodec } from '../utils';

// Types
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { OrganizationCreationData } from '../@types/pallets/control/orgCreationData';
import { ControlCreateOrgCall } from '../types/calls';

// Functions
function getOrganizationCreationData(context: EventHandlerContext): OrganizationCreationData | null {
	if (context.extrinsic) {
		// Get versioned extrinsic call
		const createData = new ControlCreateOrgCall({
			_chain: context._chain,
			block: context.block,
			extrinsic: context.extrinsic,
		});

		// Get versioned data
		if (createData.isV51) {
			const v51Data = createData.asV51;
			return {
				name: v51Data.name.toString(),
				cid: v51Data.cid.toString(),

				controller: addressCodec.encode(v51Data.controller),

				orgType: v51Data.orgType,
				access: v51Data.access,
				feeModel: v51Data.feeModel,
				fee: v51Data.fee,

				govAsset: v51Data.govAsset,
				payAsset: v51Data.payAsset,

				memberLimit: v51Data.memberLimit,
				blockNumber: context.block.height,
			};
		} else {
			let isV52 = createData.isV52, isV55 = createData.isV55;
			if (isV52 || isV55) {
				let data = isV52 ? createData.asV52 : createData.asV55;
				return {
					name: data.name.toString(),
					cid: data.cid.toString(),

					controller: addressCodec.encode(data.controllerId),

					orgType: data.orgType,
					access: data.access,
					feeModel: data.feeModel,
					fee: data.fee,

					govAsset: data.govAsset,
					payAsset: data.payAsset,

					memberLimit: data.memberLimit,
					blockNumber: context.block.height,
				};
			} else {
				console.error(`Unknown version of create organization extrinsic!`);
			}
		}
	}

	return null;
}

// Exports
export { getOrganizationCreationData };
