// Imports
// 3rd
import './loadEnv';

// Handlers
import { eventHandlers, extrinsicHandlers } from './handlerMapping';

// Constants
import { EXTRINSIC_SUCCESS } from './constants/extrinsics';

// Types
import { EventHandlerOptions, ExtrinsicHandlerOptions } from '@subsquid/substrate-processor/src/processor';
import { SubstrateProcessor } from '@subsquid/substrate-processor';

// Defaults
const defaultExtrinsicOptions: ExtrinsicHandlerOptions = { triggerEvents: [EXTRINSIC_SUCCESS] };
const defaultEventOptions: EventHandlerOptions = {};

// Init substrate processor
const processor = new SubstrateProcessor('gamedao_protocol_indexer');

processor.setTypesBundle('zeroTypesBundle.json');
processor.setBatchSize(500);

if (process.env.START_BLOCK) {
	processor.setBlockRange({
		from: parseInt(process.env.START_BLOCK),
	});
}

processor.setDataSource({
	archive: process.env.ARCHIVE_GQL ?? '',
	chain: process.env.CHAIN_RPC ?? '',
});

// Add handlers
extrinsicHandlers.forEach((extrinsicHandler) => {
	if (!extrinsicHandler.handler) return;

	processor.addExtrinsicHandler(
		extrinsicHandler.action,
		extrinsicHandler.options ?? defaultExtrinsicOptions,
		extrinsicHandler.handler,
	);
});

eventHandlers.forEach((eventHandler) => {
	if (!eventHandler.handler) return;

	processor.addEventHandler(eventHandler.action, defaultEventOptions, eventHandler.handler);
});

// Start processing
processor.run();