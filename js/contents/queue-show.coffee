@App.module 'Queue.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Controller = App.Controllers.Base.extend
		initialize: (options) ->

			queue = App.request "queue:entities"


			@layout = @getLayoutView()

			@listenTo @layout, 'show', =>
				@queueRegion queue
				
			@show @layout
		
		queueRegion: (queue) ->
			listView = @getQueueView queue

			@layout.queue.show listView


		getQueueView: (queue) ->
			new Show.List
				collection: queue
		
		getLayoutView: ->
			new Show.Layout
