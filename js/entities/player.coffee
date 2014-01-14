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
	mp3Source = document.createElement 'source'
	mp3Source.type = "audio/mp3"
	audioTag.appendChild mp3Source
	oggSource = document.createElement 'source'
	oggSource.type = "audio/ogg; codecs=vorbis"
	audioTag.appendChild oggSource
	aacSource = document.createElement 'source'
	aacSource.type = "audio/aac"
	audioTag.appendChild aacSource

	# state.get('trackData').on 'all', (ev) -> console.log ev
	#state.on 'all', (ev) ->
	#	console.log "state "+ev

	API =
		getState: ->
			state

		getCurrentTrack: ->
			state.get 'trackData'

		playTrack: (track, collection, fromQueue = false, doPlay = false) ->

			state.set
				collection: collection
				duration: 0
				canPlayPause: true
				buffered: 0
				time: 0

			if !fromQueue
				state.set
					track: track

			state.get('trackData').set track.toJSON()
			isPlaying = !audioTag.paused

			aacSource.src = track.get('stream').aac
			mp3Source.src = track.get('stream').mp3
			oggSource.src = track.get('stream').vorbis

			audioTag.load()

			if isPlaying or doPlay
				audioTag.play()

			
			@updateCanPlayNext()
			@updateCanPlayPrev()
			

			###setTimeout ->
				audioTag.currentTime = state.get('duration')-2
			, 2000###

		playNextTrack: (automatic = false) ->

			queue = App.request "queue:entities"

			queueTtrack = queue.shift()

			if queueTtrack
				return @playTrack queueTtrack, state.get('collection'), true, automatic
			
			track = state.get 'track'
			collection = state.get 'collection'

			if collection and track

				index = collection.indexOf track

				if index != -1

					nextTrack = collection.at index+1
					if nextTrack != undefined
						return @playTrack nextTrack, collection, false, automatic
					else if state.get 'repeat'
						nextTrack = collection.at 0
						if nextTrack != undefined
							return @playTrack nextTrack, collection, false, automatic


			audioTag.pause()

		playPrevTrack: ->
			track = state.get 'track'
			collection = state.get 'collection'
			if track and collection

				index = collection.indexOf track

				if state.get('time') > 5 or (index == 0 and !state.get 'repeat')
					try
						audioTag.currentTime = 0
					@updateCanPlayPrev()
					return
					

				if index > 0
					prevTrack = collection.at index-1
					@playTrack prevTrack, collection
				else if state.get 'repeat'
					prevTrack = collection.at collection.length-1
					@playTrack prevTrack, collection
			else if state.get 'canPlayPause'
				try
					audioTag.currentTime = 0
				@updateCanPlayPrev()


		togglePlayPause: ->
			if audioTag.paused
				audioTag.play()
			else
				audioTag.pause()

			@updatePlayState()

		setRepeatMode: (enabled) ->
			state.set
				repeat: enabled
			@updateCanPlayNext()

		seek: (time) ->
			try
				audioTag.currentTime = time

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
				if track and collection
					index = collection.indexOf track
					
					if index != -1 and index+1 < collection.length
						canPlayNext = true
					else if state.get 'repeat'
						canPlayNext = true

			state.set
				canNext: canPlayNext

		updateCanPlayPrev: ->

			state.set
				canPrev: state.get 'canPlayPause'


	audioTag.addEventListener 'ended', ->
		API.playNextTrack true

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
		console.log "queue changed"
		API.updateCanPlayNext()

	App.commands.setHandler 'track:play', (track) ->
		API.playTrack track, track.collection, false, true
	App.commands.setHandler 'track:play:next', ->
		API.playNextTrack()
	App.commands.setHandler 'track:play:prev', ->
		API.playPrevTrack()
	App.commands.setHandler 'track:toggle:play', ->
		API.togglePlayPause()
	App.commands.setHandler 'track:seek', (time) ->
		API.seek time

	App.commands.setHandler 'repeat:enable', (enabled) ->
		API.setRepeatMode enabled
