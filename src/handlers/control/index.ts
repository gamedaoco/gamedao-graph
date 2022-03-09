// Imports
import {handleCreateExtrinsic} from "./extrinsics/createHandler";

// Types
import {IPallet} from "../../@types/palletHandler";

// Exports
export default {
    name:              'gameDaoControl',
    extrinsicHandlers: [
        {
            action:  'create',
            handler: handleCreateExtrinsic,
        }
    ],
    eventHandlers:     []
} as IPallet;
