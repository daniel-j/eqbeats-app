@App.module 'Player', (Player, App, Backbone, Marionette, $, _) ->
	'use strict'

	Player.Layout = Marionette.Layout.extend
		template: '#player-template'
		className: 'playercontrols'

		regions:
			controls: '#media-controls'
			time: '#timeElapsed'
			duration: '#timeTotal'
			progress: '#progress-region'

		events:
			'change #repeat-box': (e)->
				App.commands.execute "repeat:enable", e.target.checked

		onRender: ->
			App.commands.execute "repeat:enable", @$el.find('#repeat-box').prop('checked')
			
	
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

		initialize: ->
			@isMouseDown = false
			$(window).mousemove @onMouseMove.bind(@)
			$(window).mouseup @onMouseUp.bind(@)
			$(window).blur @onMouseUp.bind(@)
			@dragRatio = 0

		onClose: ->
			# TODO: unbind global event listeners

		events:
			'mousedown #progress-song': 'onMouseDown'

		onMouseDown: (e) ->
			return if !@model.get 'canPlayPause'
			@isMouseDown = true
			@dragRatio = 0
			@onMouseMove e
			@progress.addClass 'isDragging'
		onMouseMove: (e) ->
			return if !@isMouseDown or !@model.get('canPlayPause')
			{ left } = @bar.offset()
			left += 16
			#winw = $(window).width()
			w = @bar.width()-8
			x = e.pageX
			
			# console.log x-left, -(left+w)+x
			ratio = (x-left)/w
			ratio = Math.min(1, Math.max(0, ratio))

			#console.log ratio
			@progress.css
				width: ratio*100+"%"
			@dragRatio = ratio

		onMouseUp: (e) ->
			return if !@isMouseDown or !@model.get('canPlayPause') or !@model.get('duration')
			@isMouseDown = false
			@progress.removeClass 'isDragging'
			App.commands.execute "track:seek", @dragRatio*@model.get('duration')
			# @updateProgress()

		onRender: ->
			@progress = @$el.find ".progressbar-progress"
			@buffered = @$el.find ".progressbar-loaded"
			@bar = @$el.find "#progress-song"

		modelEvents:
			'change:time': 'updateProgress'
			'change:duration': 'updateProgress'
			'change:buffered': 'updateBuffered'

		updateProgress: ->
			return if @isMouseDown
			ratio = @model.get('time')/@model.get('duration')
			if isNaN ratio
				ratio = 0
			@progress.css
				width: ratio*100+"%"

		updateBuffered: ->
			ratio = @model.get('buffered')/@model.get('duration')
			if isNaN ratio
				ratio = 0
			@buffered.css
				width: ratio*100+"%"


		


