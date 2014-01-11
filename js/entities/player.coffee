@App.module "Entities.Player", (Player, App, Backbone, Marionette, $, _) ->
	'use strict'

	Player.State = Backbone.Model.extend
		initialize: ->
			@set 'trackData', new App.Entities.Track

		defaults:
			collection: null
			track: null
			trackData: null
			currentIndex: 0
			time: 0
			duration: 0
			currentTime: 0
			repeat: false
			buffered: 0
			canNext: false
			canPrev: false
			canPlayPause: false
			isPlaying: false

	state = new Player.State
	audioTag = Player.audioTag = new Audio

	# state.get('trackData').on 'all', (ev) -> console.log ev

	API =
		getState: ->
			state

		getCurrentTrack: ->
			state.get 'trackData'

		playTrack: (track, collection, fromQueue = false) ->

			state.set
				collection: collection
				duration: 0
				canPlayPause: true

			if !fromQueue
				state.set
					track: track

			state.get('trackData').set track.toJSON()

			audioTag.src = track.get('stream').mp3;
			audioTag.play()

			
			@updateCanPlayNext()
			@updateCanPlayPrev()
			

			###setTimeout ->
				audioTag.currentTime = state.get('duration')-2
			, 2000###

		playNextTrack: ->
			console.log "play next!"
			queue = App.request "queue:entities"

			queueTtrack = queue.shift()

			if queueTtrack
				return @playTrack queueTtrack, state.get('collection'), true
			
			track = state.get 'track'
			collection = state.get 'collection'

			console.log track, collection

			if collection and track

				index = collection.indexOf track

				if index != -1

					nextTrack = collection.at index+1
					if nextTrack != undefined

						return @playTrack nextTrack, collection

			audioTag.pause()

		playPrevTrack: ->
			track = state.get 'track'
			collection = state.get 'collection'
			index = collection.indexOf track

			

			if state.get('time') > 5 or index == 0
				try
					audioTag.currentTime = 0
				@updateCanPlayPrev()
				return
				

			if index > 0
				prevTrack = collection.at index-1
				@playTrack prevTrack, collection

		togglePlayPause: ->
			if audioTag.paused
				audioTag.play()
			else
				audioTag.pause()

			@updatePlayState()

		updatePlayState: ->
			state.set
				isPlaying: !audioTag.paused

		updateCanPlayNext: ->
			queue = App.request "queue:entities"
			canPlayNext = false

			if queue.length > 0
				canPlayNext = true
			else
				track = state.get 'track'
				collection = state.get 'collection'
				index = collection.indexOf track
				
				if index != -1 and index+1 < collection.length
					canPlayNext = true

			state.set
				canNext: canPlayNext

		updateCanPlayPrev: ->
			track = state.get 'track'
			collection = state.get 'collection'
			index = collection.indexOf track
			canPlayPrev = false

			if state.get('time') > 5 or index == 0
				canPlayPrev = true
			else if index > 0
				canPlayPrev = true

			state.set
				canPrev: canPlayPrev


	audioTag.addEventListener 'ended', ->
		API.playNextTrack()

	audioTag.addEventListener 'play', API.updatePlayState
	audioTag.addEventListener 'pause', API.updatePlayState
	audioTag.addEventListener 'playing', API.updatePlayState
		

	audioTag.addEventListener 'durationchange', ->
		state.set
			duration: @duration
	audioTag.addEventListener 'timeupdate', ->
		state.set
			time: @currentTime
	audioTag.addEventListener 'progress', (e) ->
		bufTime = 0
		if @buffered.length > 0
			bufTime = @buffered.end(0)
		state.set
			buffered: bufTime



	App.reqres.setHandler "current:track:entity", ->
		API.getCurrentTrack()
	App.reqres.setHandler "player:state:entity", ->
		API.getState()

	App.vent.on 'queue:track:added', ->
		API.updateCanPlayNext()
	App.vent.on 'queue:track:removed', ->
		API.updateCanPlayNext()

	App.commands.setHandler 'track:play', (track) ->
		API.playTrack track, track.collection
	App.commands.setHandler 'track:play:next', ->
		API.playNextTrack()
	App.commands.setHandler 'track:play:prev', ->
		API.playPrevTrack()
	App.commands.setHandler 'track:toggle:play', ->
		API.togglePlayPause()