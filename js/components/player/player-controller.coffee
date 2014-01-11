@App.module 'Player', (Player, App, Backbone, Marionette, $, _) ->
	'use strict'
	@startWithParent = false
	controller = null

	@addInitializer (options) ->
		controller = new Player.Controller options

	Player.Controller = App.Controllers.Base.extend
		initialize: ->

			playerState = App.request "player:state:entity"
			track = playerState.get 'trackData'

			@layout = @getLayoutView()

			@listenTo @layout, 'show', =>
				@controlsRegion playerState
				@timeRegion playerState
				@durationRegion playerState
				@progressRegion playerState
				
			@show @layout

		controlsRegion: (playerState) ->
			controlsView = @getControlsView playerState
			@show controlsView, region: @layout.controls

		getControlsView: (playerState) ->
			new Player.Controls
				model: playerState


		timeRegion: (playerState) ->
			timeView = @getTimeView playerState
			@show timeView, region: @layout.time

		getTimeView: (playerState) ->
			new Player.Time
				model: playerState
				template: '#player-time'
				modelEvents:
					'change:time': 'render'


		durationRegion: (playerState) ->
			durationView = @getDurationView playerState
			@show durationView, region: @layout.duration

		getDurationView: (playerState) ->
			new Player.Time
				model: playerState
				template: '#player-duration'
				modelEvents:
					'change:duration': 'render'


		progressRegion: (playerState) ->
			progressView = @getProgressView playerState
			@show progressView, region: @layout.progress

		getProgressView: (playerState) ->
			new Player.Progress
				model: playerState
					

		getLayoutView: ->
			new Player.Layout