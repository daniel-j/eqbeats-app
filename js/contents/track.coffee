@App.module 'Track', (Track, App, Backbone, Marionette, $, _) ->
	'use strict'

	Track.Router = Marionette.AppRouter.extend
		appRoutes:
			"track/:id": "showTrack"

	API =
		showTrack: (id) ->
			new Track.Show.Controller
				id: id


	App.addInitializer ->
		new Track.Router
			controller: API
