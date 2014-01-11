@App.module 'Index.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Layout = Marionette.Layout.extend
		template: '#index'

		regions:
			featured: '#featured'
			latest: '#latest'
