@App.module 'User.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Controller = App.Controllers.Base.extend
		initialize: (options) ->
			{ id } = options
			
			user = App.request "user:entity", id
			
			@layout = @getLayoutView()

			@listenTo @layout, 'show', =>
				
				@showUserInfoView user
				@showUserPlaylistsView user
				@showUserTracksView user

			@show @layout,
				loading:
					entities: user
		
		showUserInfoView: (user) ->
			infoView = @getInfoView user
			@layout.info.show infoView
		
		showUserPlaylistsView: (user) ->
			listView = @getPlaylistsView user
			@layout.playlists.show listView
		
		showUserTracksView: (user) ->
			listView = @getTracksView user
			@layout.tracks.show listView
		

		getInfoView: (user) ->
			new Show.Info
				model: user

		getPlaylistsView: (user) ->
			new Show.Playlists
				collection: user.get 'playlists'

		getTracksView: (user) ->
			new App.View.TracklistBig
				collection: user.get 'tracks'
				className: 'tracklist-big noArtist'

		

		getLayoutView: ->
			new Show.Layout
