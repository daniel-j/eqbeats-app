@App.module 'Sidepanel', (Sidepanel, App, Backbone, Marionette, $, _) ->
	'use strict'

	Sidepanel.Layout = Marionette.Layout.extend
		template: '#sidepanel'

		regions:
			menu: '#menu'
			playlists: '#playlists'
			trackinfo: '#trackinfo-region'

	
	Sidepanel.MenuItem = Marionette.ItemView.extend
		getTemplate: ->
			if @model.get('className') != 'separator'
				'#sidepanel-menuitem'
			else
				'#empty-template'
		tagName: 'li'
		className: ->
			@model.get('className')

		modelEvents:
			'change': 'render'
		
		events:
			'click span': 'clicked'

		clicked: ->
			@trigger 'menuitem:clicked', @model

	Sidepanel.Menu = Marionette.CollectionView.extend
		tagName: 'ul'
		itemView: Sidepanel.MenuItem

	Sidepanel.Trackinfo = Marionette.ItemView.extend
		template: '#trackinfo-template'
		className: 'trackinfo-wrapper'

		modelEvents:
			'change': 'render'

		onRender: ->
			urlPlaceholder = "img/album-placeholder.png"
			return if !@model.get('download')
			if @model.get('download').art
				urlMedium = @model.get('download').art+"/medium"
				urlThumb = @model.get('download').art+"/thumb"
			else
				urlMedium = urlThumb = urlPlaceholder

			$("#coverart").prop 'src', urlPlaceholder
			$("#coverart").prop 'src', urlMedium
			$("#coverart-thumb").css
				'background-image': "url('"+urlThumb+"')"
			


