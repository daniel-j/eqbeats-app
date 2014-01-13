@App.module 'Playlist.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Layout = Marionette.Layout.extend
		template: '#playlist-layout'
		className: 'playlist'

		regions:
			info: '#info'
			list: '#list'


	Show.Info = Marionette.ItemView.extend
		template: '#playlist-info'
	


