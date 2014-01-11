@App.module 'Search', (Search, App, Backbone, Marionette, $, _) ->
	'use strict'

	Search.Router = Marionette.AppRouter.extend
		appRoutes:
			"search/": "showQueue"

	API =
		showQueue: ->
			new Search.Show.Controller
		
	App.addInitializer ->
		new Search.Router
			controller: API

