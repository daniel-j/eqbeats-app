@App.module 'Player', (Player, App, Backbone, Marionette, $, _) ->
	'use strict'

	Player.Layout = Marionette.Layout.extend
		template: '#player-template'
		className: 'playercontrols'

		regions:
			controls: '#media-controls'
			time: '#timeElapsed'
			duration: '#timeTotal'
			progress: '#progress-song'
			
	
	Player.Controls = Marionette.ItemView.extend
		template: '#player-controls'

		events:
			'click #next-track-btn': -> App.commands.execute "track:play:next"
			'click #prev-track-btn': -> App.commands.execute "track:play:prev"
			'click #play-pause-track-btn': -> App.commands.execute "track:toggle:play"

		onRender: ->
			@prevBtn = @$el.find "#prev-track-btn"
			@playBtn = @$el.find "#play-pause-track-btn"
			@nextBtn = @$el.find "#next-track-btn"

		modelEvents:
			'change:isPlaying': 'setPlayState'
			'change:canPlayPause': 'setCanPlayPause'
			'change:canNext': 'setCanNext'
			'change:canPrev': 'setCanPrev'

		setPlayState: ->
			if @model.get 'isPlaying'
				@playBtn.addClass 'paused'
			else
				@playBtn.removeClass 'paused'

		setCanPlayPause: ->
			@playBtn.prop 'disabled', !@model.get 'canPlayPause'
		setCanNext: ->
			@nextBtn.prop 'disabled', !@model.get 'canNext'
		setCanPrev: ->
			@prevBtn.prop 'disabled', !@model.get 'canPrev'

	Player.Time = Marionette.ItemView.extend
		tagName: 'span'

		templateHelpers:
			formatTime: (time) ->
				App.request "format:time", time

	Player.Progress = Marionette.ItemView.extend

		template: '#player-progress'
		className: 'progressbar-track'

		modelEvents:
			'change:time': 'updateProgress'
			'change:duration': 'updateProgress'
			'change:buffered': 'updateBuffered'

		onRender: ->
			@progress = @$el.find ".progressbar-progress"
			@buffered = @$el.find ".progressbar-loaded"

		updateProgress: ->
			@progress.css
				width: (@model.get('time')/@model.get('duration'))*100+"%"

		updateBuffered: ->
			@buffered.css
				width: (@model.get('buffered')/@model.get('duration'))*100+"%"


		


