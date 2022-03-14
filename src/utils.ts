// Imports
import {codec} from "@subsquid/ss58";

// Exports
export const addressCodec = codec(parseInt(process.env.NETWORK_ADDRESS_PREFIX ?? "0"));
