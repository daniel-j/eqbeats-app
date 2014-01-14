@App.module 'Sidepanel', (Sidepanel, App, Backbone, Marionette, $, _) ->
	'use strict'

	Sidepanel.Layout = Marionette.Layout.extend
		template: '#sidepanel'

		regions:
			menuBefore: '#menu-before'
			playlists: '#playlists'
			menuAfter: '#menu-after'
			trackinfo: '#trackinfo-region'

		events:
			'submit #search-form': 'searchSubmit'

		searchSubmit: (e) ->
			e.preventDefault()
			query = @$el.find('#searchbar').val().trim()
			if query.length > 0
				document.location.href = "#/tracks/search?q="+encodeURIComponent(query)
				App.execute "search:tracks", query

	
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
			


