
require(["historyManager", "api"], function (historyManager, api) {
	'use strict';

	console.log(historyManager);

	historyManager.on('state', function (state) {
		console.log(state);
	});

	historyManager.initialize();

});