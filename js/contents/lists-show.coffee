@App.module 'Lists.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Controller = App.Controllers.Base.extend
		initialize: (options) ->
			{ title, name } = options

			list = App.request name+":entities"

			model = new Backbone.Model
				title: title
				name: name

			@layout = @getLayoutView(model)

			@listenTo @layout, 'show', =>
				listView = @listRegion list

			@listenTo @layout, 'reload:list', =>
				list.fetch()
				
			@show @layout
		
		listRegion: (list) ->
			listView = @getListView list
			
			@show listView,
				loading:
					entities: list
				region: @layout.list

			listView
			
		getListView: (list) ->
			new App.View.Playlist
				collection: list
		
		getLayoutView: (model) ->
			new Show.Layout
				model: model
