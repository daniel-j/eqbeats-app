@App.module 'Iframe.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.IframeView = Marionette.ItemView.extend
		template: '#iframe-view'
		id: 'iframe-view'
