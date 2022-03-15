// Imports
import { codec } from '@subsquid/ss58';

// Exports
export const hashToHexString = (hash: Uint8Array) => `0x${Buffer.from(hash).toString('hex')}`;
export const addressCodec = codec(parseInt(process.env.NETWORK_ADDRESS_PREFIX ?? '0'));
