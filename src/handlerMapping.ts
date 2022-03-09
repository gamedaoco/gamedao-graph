// Imports
import pallets from './handlers';

// Types
import {IPalletActionHandler, IPalletEventHandler, IPalletExtrinsicHandler} from "./@types/palletHandler";

// Data
const extrinsicHandlers: IPalletExtrinsicHandler[] = [];
const eventHandlers: IPalletEventHandler[] = [];

// Collect all handlers
pallets.forEach(pallet => {
    const mergeHandlers = (handlers: IPalletActionHandler<any, any>[]) => {
        handlers.forEach(handler => {
            extrinsicHandlers.push({
                action:  `${pallet.name}.${handler.action}`,
                options: handler.options,
                handler: handler.handler,
            });
        });
    }

    // Merge them into main arrays
    mergeHandlers(pallet.extrinsicHandlers);
    mergeHandlers(pallet.eventHandlers);
});

// Exports
export {
    extrinsicHandlers,
    eventHandlers,
};
