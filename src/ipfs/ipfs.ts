// Imports
// 3rd
import { to } from 'await-to-js';
import fetch from 'node-fetch';

// Constants
import { getIpfsUrlByCid } from '../constants/ipfs';

// Functions
async function fetchJsonByCid(cid: string): Promise<any | null> {
	const [err, response] = await to(fetch(getIpfsUrlByCid(cid)));
	if (err) return null;

	return response?.json();
}

export { fetchJsonByCid };
