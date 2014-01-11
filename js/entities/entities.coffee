@App.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->
	'use strict'
	
	Entities.User = Backbone.Model.extend
		url: ->
			config.host+"/user/"+this.id+"/json"

		initialize: ->
			this.set 'tracks', new Entities.Tracks
			this.set 'playlists', new Entities.Playlists
		
		parse: (resp, options) ->
			this.get('tracks').set resp.tracks
			this.get('playlists').set resp.playlists
			delete resp.tracks
			delete resp.playlists
			return resp
		
		defaults:
			name: ''
			avatar: ''
			description: ''
			html_description: ''
		
	
	Entities.Track = Backbone.Model.extend
		url: ->
			config.host+"/track/"+this.id+"/json"
		
		defaults:
			title: ''
			artist:
				name:''

		idAttribute: '_no_id_'
			
		
	Entities.Playlist = Backbone.Model.extend
		url: ->
			config.host+"/playlist/"+this.id+"/json"
		
		initialize: ->
			this.set 'collection', new Entities.Tracks
		
		parse: (resp, options) ->
			this.get('collection').set resp.tracks
			resp
		
		defaults:
			name: ''
			author:
				name: ''
			
			description: ''
			html_description: ''
		

	Entities.SimplePlaylist = Backbone.Model.extend
		defaults:
			name: ''
			author:
				name: ''
			
			description: ''
			html_description: ''
		
	
	Entities.Favourites = Backbone.Model.extend
		url: ->
			config.host+'/user/'+this.id+'/favorites/json'
		
		initialize: ->
			this.set 'tracks', new Entities.Tracks
		
		parse: (resp, options) ->
			this.get('tracks').set resp
			{}

	Entities.Featured = Backbone.Collection.extend
		model: Entities.Track
		url: config.host+'/tracks/featured/json'
	
	Entities.Latest = Backbone.Collection.extend
		model: Entities.Track
		url: config.host+'/tracks/latest/json'
	
	Entities.Random = Backbone.Collection.extend
		model: Entities.Track
		url: config.host+'/tracks/random/json'
	
	
	Entities.Tracks = Backbone.Collection.extend
		model: Entities.Track
	
	Entities.Playlists = Backbone.Collection.extend
		model: Entities.SimplePlaylist

	Entities.QueuedTracks = Backbone.Collection.extend
		model: Entities.Track
		
	premade = 
		featured: new Entities.Featured
		latest: new Entities.Latest
		queue: new Entities.QueuedTracks
		currentUser: new Entities.User

	#premade.queue.on 'all', (ev, model, col, opts) -> console.log ev, model

	doPrefill = false

	premade.currentUser.on 'all', (ev) ->
		#console.log ev

	premade.currentUser.on 'sync', ->
		localStorage.eqbeatsCurrentUserId = @get 'id'
		App.vent.trigger "current:user:changed", @

	premade.queue.on 'add', ->
		App.vent.trigger "queue:track:added"
	premade.queue.on 'remove', ->
		App.vent.trigger "queue:track:removed"

	#premade.currentUser.on 'error', (ev) ->
	#	alert "No such user"

	API =
		getCurrentUser: ->
			premade.currentUser

		getFeatured: ->
			premade.featured = new Entities.Featured
			premade.featured.fetch
				prefill: doPrefill
			premade.featured
		getLatest: ->
			premade.latest = new Entities.Latest
			premade.latest.fetch
				prefill: doPrefill
			premade.latest

		getUser: (id) ->
			user = new Entities.User
				id: id
			user.fetch
				prefill: doPrefill
			user
		getUserFavourites: (id) ->
			favourites = new Entities.Favourites
				id: id
			favourites.fetch
				prefill: doPrefill
			favourites

		getPlaylist: (id) ->
			playlist = new Entities.Playlist
				id: id
			playlist.fetch
				prefill: doPrefill
			playlist

		getQueue: ->
			premade.queue


		setCurrentUser: (id) ->
			premade.currentUser.set {id: id}, silent: true
			premade.currentUser.fetch
				prefill: doPrefill
			premade.currentUser

		addToQueue: (track) ->
			model = new Entities.Track track.toJSON()
			model.set '_id', model.get('id'), silent: true
			model.unset 'id', silent: true
			premade.queue.push model, silent: true
			model.set 'id', model.get('_id'), silent: true
			model.unset '_id', silent: true
			premade.queue.trigger 'add', model, premade.queue, {}


	App.reqres.setHandler "current:user:entity", ->
		API.getCurrentUser()

	App.reqres.setHandler "featured:entities", ->
		API.getFeatured()
	App.reqres.setHandler "latest:entities", ->
		API.getLatest()

	App.reqres.setHandler "user:entity", (id) ->
		API.getUser id
	App.reqres.setHandler "user:favourites:entities", (id) ->
		API.getUserFavourites id

	App.reqres.setHandler "playlist:entity", (id) ->
		API.getPlaylist id

	App.reqres.setHandler "queue:entities", ->
		API.getQueue()


	App.commands.setHandler 'current:user:set', (id) ->
		API.setCurrentUser id
	App.commands.setHandler 'track:queue:clicked', (track, child) ->
		API.addToQueue track
	