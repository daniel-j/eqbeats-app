@App.module 'History.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Controller = App.Controllers.Base.extend
		initialize: (options) ->

			history = App.request "history:entities"

			@layout = @getLayoutView()

			@listenTo @layout, 'show', =>
				@historyRegion history
				
			@show @layout
		
		historyRegion: (history) ->
			listView = @getHistoryView history

			@layout.history.show listView


		getHistoryView: (history) ->
			new App.View.Playlist
				collection: history
		
		getLayoutView: ->
			new Show.Layout
