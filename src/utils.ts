// Imports
import { codec } from '@subsquid/ss58';

// Constants
import { networkAddressPrefix } from './config.json';

// Exports
export const hashToHexString = (hash: Uint8Array) => `0x${Buffer.from(hash).toString('hex')}`;
export const hexStringToString = (data: string) =>
	`${Buffer.from(data.startsWith('0x') ? data.substring(2) : data, 'hex').toString('utf-8')}`;
export const addressCodec = codec(networkAddressPrefix);
