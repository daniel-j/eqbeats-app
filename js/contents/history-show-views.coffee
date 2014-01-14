@App.module 'History.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Layout = Marionette.Layout.extend
		template: '#history-template'

		regions:
			history: '#history'
