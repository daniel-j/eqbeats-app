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
			'mousedown #sidepanel-handle': 'handleMouseDown'

		searchSubmit: (e) ->
			e.preventDefault()
			query = @$el.find('#searchbar').val().trim()
			if query.length > 0
				document.location.href = "#/tracks/search?q="+encodeURIComponent(query)
				App.execute "search:tracks", query

		initialize: ->
			@holdingHandle = false
			@mouseDownX = 0
			$(window).mousemove @onMouseMove.bind(@)
			$(window).mouseup @onMouseUp.bind(@)
			$(window).blur @onMouseUp.bind(@)

		onClose: ->
			# TODO: unbind global event listeners

		handleMouseDown: (e) ->
			@holdingHandle = true
			@handleX = @leftPane.width()-e.pageX
			#@onMouseMove e

		onMouseMove: (e) ->
			return if !@holdingHandle

			@leftPane.css
				width: Math.max(Math.min(e.pageX+@handleX, 480), 128)+"px"

		onMouseUp: (e) ->
			return if !@holdingHandle
			@holdingHandle = false

		onRender: ->
			@leftPane = $ ".left-pane"

	
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
			


