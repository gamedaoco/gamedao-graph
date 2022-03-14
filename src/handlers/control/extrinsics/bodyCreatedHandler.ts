// Imports
// 3rd
import {EventHandlerContext} from "@subsquid/substrate-processor";

// Types
import {GameDaoControlBodyCreatedEvent} from "../../../types/events";

// Logic
async function handleBodyCreatedEvent(context: EventHandlerContext) {
    const bodyCreatedData = new GameDaoControlBodyCreatedEvent(context);

    if (bodyCreatedData.isV21) {
        // console.log(bodyCreatedData.asV21);
    }
}

// Exports
export {
    handleBodyCreatedEvent,
};
