@App.module 'Lists.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Layout = Marionette.Layout.extend
		template: '#lists-template'

		regions:
			list: '#list'

		events:
			'click .reload-list': -> @trigger 'reload:list'
