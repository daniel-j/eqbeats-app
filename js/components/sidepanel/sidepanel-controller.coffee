@App.module 'Sidepanel', (Sidepanel, App, Backbone, Marionette, $, _) ->
	'use strict'
	@startWithParent = false
	controller = null

	@addInitializer (options) ->
		controller = new Sidepanel.Controller options

	Sidepanel.Controller = App.Controllers.Base.extend
		initialize: ->

			menu = App.request "menu:sidepanel:entities"
			user = App.request "current:user:entity"
			track = App.request "current:track:entity"

			@layout = @getLayoutView()

			@listenTo @layout, 'show', =>
				@menuRegion menu
				@playlistsRegion user
				@trackInfoRegion track
				
			@show @layout,
				loading:
					entities: [menu, user]
		
		menuRegion: (menu) ->
			listView = @getMenuView menu

			@listenTo listView, 'itemview:menuitem:clicked', (iv, menuitem) ->
				if menuitem.has 'url'
					App.navigate menuitem.get('url'), trigger: true

				if menuitem.has 'action'
					menuitem.get('action').apply(menuitem)

			@show listView, region: @layout.menu

		playlistsRegion: (user) ->
			listView = @getPlaylistsView user

			@listenTo listView, 'itemview:menuitem:clicked', (iv, playlist) ->
				App.navigate "playlist/"+playlist.get('id'), trigger: true

			@show listView, region: @layout.playlists

		trackInfoRegion: (track) ->
			infoView = @getTrackInfoView track
			@show infoView, region: @layout.trackinfo


		getMenuView: (menu) ->
			new Sidepanel.Menu
				collection: menu

		getPlaylistsView: (user) ->
			new Sidepanel.Menu
				collection: user.get('playlists')

		getTrackInfoView: (track) ->
			new Sidepanel.Trackinfo
				model: track
		
		getLayoutView: ->
			new Sidepanel.Layout
