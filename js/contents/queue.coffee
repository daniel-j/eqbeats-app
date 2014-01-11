@App.module 'Queue', (Queue, App, Backbone, Marionette, $, _) ->
	'use strict'

	Queue.Router = Marionette.AppRouter.extend
		appRoutes:
			"queue": "showQueue"

	API =
		showQueue: ->
			new Queue.Show.Controller
		
	App.addInitializer ->
		new Queue.Router
			controller: API

