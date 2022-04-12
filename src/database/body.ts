// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { Body } from '../model';
import { get } from './helper';
import { upsertIdentity } from './identity';

// Types
import { BodyCreationData } from '../@types/pallets/control/bodyCreationData';
import { BodyMetadata as BodyIpfsMetadata } from '../@types/ipfs/bodyMetadata';

// Helpers
import { addressCodec } from '../utils';
import { upsertBodyMetadata } from './bodyMetadata';

// Functions
function getBody(store: Store, bodyId: string): Promise<Body | null> {
	return get(store, Body, bodyId, ['creatorIdentity', 'metadata']);
}

async function createBody(
	store: Store,
	bodyId: string,
	signer: string,
	data: BodyCreationData,
	metadata: BodyIpfsMetadata,
) {
	// Check if exists
	let body = await getBody(store, bodyId);
	if (body) return body;

	// Create instance
	body = new Body();

	// Fill data
	body.id = bodyId;
	body.creator = signer;
	body.creatorIdentity = await upsertIdentity(store, signer, null);
	body.controller = addressCodec.encode(data.controller);
	body.controllerIdentity = await upsertIdentity(store, body.controller, null);
	body.treasury = addressCodec.encode(data.treasury);
	body.treasuryIdentity = await upsertIdentity(store, body.treasury, null);
	body.cid = data.cid.toString();
	body.body = data.body;
	body.access = data.access;
	body.feeModel = data.feeModel;
	body.fee = data.fee;
	body.govAsset = data.govAsset;
	body.payAsset = data.payAsset;
	body.memberLimit = data.memberLimit;
	body.metadata = await upsertBodyMetadata(store, body.cid, metadata);

	// Save body
	await store.save(body);

	return body;
}

// Exports
export { createBody, getBody };
