@App.module 'User.Favourites', (Favourites, App, Backbone, Marionette, $, _) ->
	'use strict'

	Favourites.Layout = Marionette.Layout.extend
		template: '#favourites-layout'
		className: 'favourites'

		regions:
			info: '#info'
			list: '#list'

	Favourites.Info = Marionette.ItemView.extend
		template: '#favourites-info'
		tagName: 'div'

		modelEvents:
			'sync': 'render'

	Favourites.Track = Marionette.ItemView.extend
		template: '#playlist-track'
		tagName: 'tr'


	Favourites.List = Marionette.CompositeView.extend
		template: '#playlist-list'
		itemView: Favourites.Track
		itemViewContainer: 'tbody'

