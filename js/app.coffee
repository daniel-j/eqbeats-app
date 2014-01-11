# eqbeats webapp by djazz
# http://djazz.se
# https://eqbeats.org

@config =
	host: "https://eqbeats.org"

@App = do (Backbone, Marionette) ->
	'use strict'

	Backbone.emulateHTTP = true
	#Backbone.fetchCache.localStorage = false

	App = new Marionette.Application

	App.addRegions
		sideRegion: "#side-region"
		mainRegion: "#main-region"
		playerRegion: "#player-region"

	App.reqres.setHandler "default:region", ->
		App.mainRegion

	App.on 'initialize:before', (options) ->
		@execute 'current:user:set', options.currentUserId

	App.addInitializer ->
		# footer, header, menu etc.. static modules
		@module('Sidepanel').start
			region: @sideRegion
		@module('Player').start
			region: @playerRegion


	App.commands.setHandler "register:instance", (instance, id) ->
		App.register instance, id
	
	App.commands.setHandler "unregister:instance", (instance, id) ->
		App.unregister instance, id


	App.on "initialize:after", (options) ->
		@startHistory()
	
	App

