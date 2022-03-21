// Imports
import { codec } from '@subsquid/ss58';

// Constants
import { networkAddressPrefix } from './config.json';


// Exports
export const hashToHexString = (hash: Uint8Array) => `0x${Buffer.from(hash).toString('hex')}`;
export const addressCodec = codec(networkAddressPrefix);