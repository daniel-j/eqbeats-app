@App.module 'Queue.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Layout = Marionette.Layout.extend
		template: '#queue-template'

		regions:
			queue: '#queue'
	
	Show.List = App.View.Playlist.extend
		className: 'editable'