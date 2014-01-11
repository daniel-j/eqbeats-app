@App.module 'User.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Layout = Marionette.Layout.extend
		template: '#user'

		regions:
			info: '#info'
			tracks: '#tracks'
			playlists: '#playlists'

	Show.Info = Marionette.ItemView.extend
		template: '#user-info'
		tagName: 'div'
		
		modelEvents:
			'sync': 'render'


	Show.Track = Marionette.ItemView.extend
		template: '#playlist-track'
		tagName: 'tr'

	Show.Tracks = Marionette.CompositeView.extend
		template: '#playlist-list'
		itemView: Show.Track
		itemViewContainer: 'tbody'


	Show.Playlist = Marionette.ItemView.extend
		template: '#user-playlist'
		tagName: 'li'

	Show.Playlists = Marionette.CollectionView.extend
		itemView: Show.Playlist
		tagName: 'ul'
	

