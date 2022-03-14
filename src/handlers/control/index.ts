// Imports
import {handleCreateExtrinsic} from "./extrinsics/createHandler";
import {handleBodyCreatedEvent} from "./extrinsics/bodyCreatedHandler";

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
    eventHandlers:     [
        {
            action: 'BodyCreated',
            handler: handleBodyCreatedEvent,
        }
    ]
} as IPallet;
