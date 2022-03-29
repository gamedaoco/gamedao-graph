// Imports
import { hexStringToString } from '../../../utils';

// 3rd
import { EventHandlerContext } from '@subsquid/substrate-processor';

// Database

// Types
import { IdentityUpsertData } from '../../../@types/pallets/identity/identityUpsertData';
import { createOrUpdateIdentity } from '../../../database/identity';

// Logic
async function handleIdentitySetEvent(context: EventHandlerContext) {
	if (!context.extrinsic) return;

	const getValue = (data: string | undefined) => (data ? hexStringToString(data) : null);

	const identityData = context.extrinsic.args[0].value as { [key: string]: any };

	const upsertData: IdentityUpsertData = {
		address: context.extrinsic.signer,
		displayName: getValue(identityData.display?.raw),
		legalName: getValue(identityData.legal?.raw),
		email: getValue(identityData.email?.raw),
		riot: getValue(identityData.riot?.raw),
		image: getValue(identityData.image?.raw),
		twitter: getValue(identityData.twitter?.raw),
	};

	await createOrUpdateIdentity(context.store, upsertData.address, upsertData);
}

// Exports
export { handleIdentitySetEvent };
