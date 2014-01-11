@App.module 'Search.Result', (Result, App, Backbone, Marionette, $, _) ->
	'use strict'

	Result.Controller = App.Controllers.Base.extend
		initialize: (options) ->
			{ query } = options
			
			tracks = App.request "search:tracks:entities", query
			info = new Backbone.Model
				query: query
			
			@layout = @getLayoutView()

			@listenTo @layout, 'show', =>
				@showInfoView info
				@showTracksView tracks

			@show @layout,
				loading:
					entities: tracks

		showInfoView: (info) ->
			infoView = @getInfoView info
			@show infoView, region: @layout.info
		
		showTracksView: (tracks) ->
			listView = @getTracksView tracks
			@show listView, region: @layout.result

		getInfoView: (info) ->
			new Result.Info
				model: info

		getTracksView: (tracks) ->
			new App.View.Playlist
				collection: tracks

		getLayoutView: ->
			new Result.Layout
