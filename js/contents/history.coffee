@App.module 'History', (History, App, Backbone, Marionette, $, _) ->
	'use strict'

	History.Router = Marionette.AppRouter.extend
		appRoutes:
			"history": "showHistory"

	API =
		showHistory: ->
			new History.Show.Controller
		
	App.addInitializer ->
		new History.Router
			controller: API

