@App.module 'User.Favourites', (Favourites, App, Backbone, Marionette, $, _) ->
	'use strict'

	Favourites.Controller = App.Controllers.Base.extend
		initialize: (options) ->
			{ id } = options

			user = App.request "user:entity", id
			favourites = App.request "user:favourites:entities", id
			
			@layout = @getLayoutView()

			@listenTo @layout, 'show', =>
				
				@showUserInfoView user
				@showUserFavouritesView favourites

			@show @layout,
				loading:
					entities: [user, favourites]
		
		showUserInfoView: (user) ->
			infoView = @getInfoView user
			@layout.info.show infoView
		
		showUserFavouritesView: (favourites) ->
			listView = @getFavouritesView favourites
			@layout.list.show listView
		

		getInfoView: (user) ->
			new Favourites.Info
				model: user

		getFavouritesView: (favourites) ->
			new App.View.Playlist
				collection: favourites.get 'tracks'
		

		getLayoutView: ->
			new Favourites.Layout