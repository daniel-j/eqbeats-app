@App.module 'Playlist', (Playlist, App, Backbone, Marionette, $, _) ->
	'use strict'

	Playlist.Router = Marionette.AppRouter.extend
		appRoutes:
			"playlist/:id": "showPlaylist"


	API =
		showPlaylist: (id) ->
			new Playlist.Show.Controller
				id: id


	App.addInitializer ->
		new Playlist.Router
			controller: API

	

