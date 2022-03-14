// Imports
// 3rd
import {ExtrinsicHandlerContext} from "@subsquid/substrate-processor";

// Types
import {GameDaoControlCreateCall} from "../../../types/calls";
import {Body}                     from "../../../model";
import {addressCodec}             from "../../../utils";

// Logic
async function handleCreateExtrinsic(context: ExtrinsicHandlerContext) {
    const createData = new GameDaoControlCreateCall(context);

    const model = new Body();
    model.id = context.extrinsic.id;
    model.creator = context.extrinsic.signer;

    if (createData.isV21) {
        const v21Data = createData.asV21;

        model.controller = v21Data.controller.toString();
        model.treasury = v21Data.treasury.toString();
        model.name = v21Data.name.toString();
        model.cid = v21Data.cid.toString();
        model.body = v21Data.body;
        model.access = v21Data.access;
        model.feeModel = v21Data.feeModel;
        model.fee = v21Data.fee;
        model.govAsset = v21Data.govAsset;
        model.payAsset = v21Data.payAsset;
        model.memberLimit = v21Data.memberLimit;

        await context.store.save(model);
    } else if (createData.isV30) {
        const v30Data = createData.asV30;
        console.log(context.block.height);
        console.log(addressCodec.encode(v30Data.controller));
        console.log(v30Data.name.toString());
        console.log(v30Data.cid.toString());
return;


        model.controller = v30Data.controller.toString();
        model.treasury = v30Data.treasury.toString();
        model.name = v30Data.name.toString();
        model.cid = v30Data.cid.toString();
        model.body = v30Data.body;
        model.access = v30Data.access;
        model.feeModel = v30Data.feeModel;
        model.fee = v30Data.fee;
        model.govAsset = v30Data.govAsset;
        model.payAsset = v30Data.payAsset;
        model.memberLimit = v30Data.memberLimit;

    }

    await context.store.save(model);
}

// Exports
export {
    handleCreateExtrinsic,
};
