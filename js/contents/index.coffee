@App.module 'Index', (Index, App, Backbone, Marionette, $, _) ->
	'use strict'

	Index.Router = Marionette.AppRouter.extend
		appRoutes:
			"": "showIndex"

	API =
		showIndex: ->
			new Index.Show.Controller
		
	App.addInitializer ->
		new Index.Router
			controller: API

