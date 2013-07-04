
require(["historyManager", "api"], function (historyManager, api) {
	'use strict';

	console.log(historyManager);

	historyManager.on('state', function (state) {
		switch (state.controller) {
			case "": // Home

				// ... stuff ...

				break;
		}
	});

	historyManager.initialize();

	api.getPlaylist(81, function (err, data) {
		console.log(data);
	});

});