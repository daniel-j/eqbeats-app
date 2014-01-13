@App.module 'User', (User, App, Backbone, Marionette, $, _) ->
	'use strict'

	User.Router = Marionette.AppRouter.extend
		appRoutes:
			"user/:id": "showUser"
			"user/:id/favorites": "showFavourites"

	API =
		showUser: (id) ->
			new User.Show.Controller
				id: id
		
		showFavourites: (id) ->
			new User.Favourites.Controller
				id: id


	App.addInitializer ->
		new User.Router
			controller: API
