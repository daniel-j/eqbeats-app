require.config({
	paths: {
		zepto: 'lib/zepto',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone'
	}

});

require(['app'], function (App) {
	'use strict';

	App.initialize();

});
