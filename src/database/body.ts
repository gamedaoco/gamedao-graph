// Imports
// 3rd
import { Store } from '@subsquid/substrate-processor';

// Database
import { Body } from '../model';
import { get } from './helper';

// Types
import { BodyCreationData } from '../@types/pallets/control/bodyCreationData';

// Helpers
import { addressCodec } from '../utils';

// Functions
function getBody(store: Store, bodyId: string): Promise<Body | null> {
	return get(store, Body, bodyId);
}

async function createBody(store: Store, bodyId: string, signer: string, data: BodyCreationData) {
	// Check if exists
	let body = await getBody(store, bodyId);
	if (body) return body;

	// Create instance
	body = new Body();

	// Fill data
	body.id = bodyId;
	body.creator = signer;
	body.controller = addressCodec.encode(data.controller);
	body.treasury = addressCodec.encode(data.treasury);
	body.cid = data.cid.toString();
	body.body = data.body;
	body.access = data.access;
	body.feeModel = data.feeModel;
	body.fee = data.fee;
	body.govAsset = data.govAsset;
	body.payAsset = data.payAsset;
	body.memberLimit = data.memberLimit;

	// Save body
	await store.save(body);

	return body;
}

// Exports
export { createBody, getBody };
