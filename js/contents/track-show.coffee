@App.module 'Track.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Controller = App.Controllers.Base.extend
		initialize: (options) ->
			{ id } = options
			
			track = App.request "track:entity", id
			collection = new Backbone.Collection [track]
			collection.add track
			
			@layout = @getLayoutView track

			@listenTo @layout, 'show', =>
				infoView = @showTrackInfoView track
				@showTrackPlayerView track

			@show @layout,
				loading:
					entities: track
		
		showTrackInfoView: (track) ->
			infoView = @getInfoView track
			@layout.info.show infoView

		showTrackPlayerView: (track) ->
			playerView = @getPlayerView track
			@layout.player.show playerView
		

		getInfoView: (track) ->
			new Show.Info
				model: track

		getPlayerView: (track) ->
			new Show.Player
				model: track

		
		getLayoutView: (track) ->
			new Show.Layout
				model: track
