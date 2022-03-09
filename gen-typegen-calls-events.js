const fs = require('fs');
const typegen = require('./typegen.json');
const {eventHandlers,extrinsicHandlers} = require('./lib/handlerMapping');

fs.writeFileSync(
	'typegen.json',
	`${JSON.stringify(
		{
			...typegen,
			calls: extrinsicHandlers.map(handler => handler.action),
			events: eventHandlers.map(handler => handler.action),
		},
		null,
		2,
	)}`,
);
