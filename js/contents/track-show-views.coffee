@App.module 'Track.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Layout = Marionette.Layout.extend
		template: '#track-layout'
		className: 'track'

		regions:
			info: '#info'
			player: '#track-player'

	Show.Info = Marionette.ItemView.extend
		template: '#track-info'
		
		modelEvents:
			'sync': 'render'

	Show.Player = Marionette.ItemView.extend
		template: '#track-player-template'
		className: 'track-player'

		modelEvents:
			'sync': 'render'

		events:
			'click button.play-track': ->
				App.commands.execute "track:play", @model, @
