// Imports
// 3rd
import {ExtrinsicHandlerContext} from "@subsquid/substrate-processor";

// Types
import {GameDaoControlCreateCall} from "../../../types/calls";
import {Body}                     from "../../../model";

async function handleCreateExtrinsic(context: ExtrinsicHandlerContext) {
    const createData = new GameDaoControlCreateCall(context);

    if (createData.isV21) {
        // const model = new Body();
       // model.id = createData.asV21.

        console.log("21", context.event.params);
    }

    if (createData.isV30) {
        // const model = new Body();
       // model.id = createData.asV21.

        console.log("30", context.event.params);
    }
}

// Exports
export {
    handleCreateExtrinsic,
};
