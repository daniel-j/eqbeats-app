@App.module 'Playlist.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Controller = App.Controllers.Base.extend
		initialize: (options) ->
			{ id } = options

			playlist = App.request "playlist:entity", id
			author = null

			@layout = @getLayoutView()
			
			playlist.bind 'sync', =>
				author = App.request "user:entity", playlist.get('author').id

				author.bind 'sync', =>
					playlist.set 'author', author.attributes
					
				@show @layout,
					loading:
						entities: [playlist, author]

			@listenTo @layout, 'show', =>

				@showPlaylistInfoView playlist
				@showPlaylistListView playlist


		
		
		showPlaylistInfoView: (playlist) ->
			infoView = @getInfoView playlist
			@layout.info.show infoView
		
		showPlaylistListView: (playlist) ->
			listView = @getListView playlist
			@layout.list.show listView
		

		getInfoView: (playlist) ->
			new Show.Info
				model: playlist

		getListView: (playlist) ->
			new App.View.Playlist
				collection: playlist.get 'collection'
		
		
		getLayoutView: ->
			new Show.Layout
