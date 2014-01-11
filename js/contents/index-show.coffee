@App.module 'Index.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Controller = App.Controllers.Base.extend
		initialize: (options) ->

			featured = App.request "featured:entities"
			latest = App.request "latest:entities"

			@layout = @getLayoutView()

			@listenTo @layout, 'show', =>
				@featuredRegion featured
				@latestRegion latest
				
			@show @layout
		
		featuredRegion: (featured) ->
			listView = @getFeaturedView featured
			@show listView,
				loading:
					entities: featured
				region: @layout.featured
		
		latestRegion: (latest) ->
			listView = @getLatestView latest

			@show listView,
				loading:
					entities: latest
				region: @layout.latest
			
		getFeaturedView: (featured) ->
			new App.View.TracklistBig
				collection: featured
		
		getLatestView: (latest) ->
			new App.View.TracklistBig
				collection: latest
		
		getLayoutView: ->
			new Show.Layout
