// Imports
// 3rd
import { to } from 'await-to-js';
import fetch from 'node-fetch';

// Constants
import { getIpfsUrlByCid } from '../constants/ipfs';

// Functions
async function fetchJsonByCid(cid: string): Promise<any | null> {
	const [errFetch, response] = await to(fetch(getIpfsUrlByCid(cid)));
	if (errFetch) return null;

	const [errJson, json] = await to(response!.json());
	if (errJson) return null;

	return json;
}

export { fetchJsonByCid };
