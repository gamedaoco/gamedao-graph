// Imports
import pallets from './handlers';

// Types
import {IPalletActionHandler, IPalletEventHandler, IPalletExtrinsicHandler} from "./@types/palletHandler";

// Data
const extrinsicHandlers: IPalletExtrinsicHandler[] = [];
const eventHandlers: IPalletEventHandler[] = [];

// Collect all handlers
pallets.forEach(pallet => {
    const mergeHandlers = (handlers: IPalletActionHandler<any, any>[], saveHandlers: any[]) => {
        handlers.forEach(handler => {
            saveHandlers.push({
                action:  `${pallet.name}.${handler.action}`,
                options: handler.options,
                handler: handler.handler,
            });
        });
    }

    // Merge them into main arrays
    mergeHandlers(pallet.extrinsicHandlers, extrinsicHandlers);
    mergeHandlers(pallet.eventHandlers, eventHandlers);
});

// Exports
export {
    extrinsicHandlers,
    eventHandlers,
};
