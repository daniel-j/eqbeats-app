@App.module 'Search.Result', (Result, App, Backbone, Marionette, $, _) ->
	'use strict'

	Result.Layout = Marionette.Layout.extend
		template: '#search-result-template'

		regions:
			info: '#info'
			result: '#result'
	
	Result.Info = Marionette.ItemView.extend
		template: '#search-result-info'