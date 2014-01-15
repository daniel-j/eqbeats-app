@App.module 'Iframe', (Iframe, App, Backbone, Marionette, $, _) ->
	'use strict'

	Iframe.Router = Marionette.AppRouter.extend
		appRoutes:
			":webpage": "showIframe"
			#"web/track/:id": "showTrackPage"
			#"web/user/:id": "showUserPage"

	API =
		showIframe: (webpage) ->
			if urls[webpage]
				@showUrl urls[webpage]
		
		showUrl: (url) ->
			new Iframe.Show.Controller
				url: url

		showTrackPage: (id) ->
			@showUrl "https://eqbeats.org/track/"+id
		showUserPage: (id) ->
			@showUrl "https://eqbeats.org/user/"+id

	urls =
		blog: 'http://blog.eqbeats.org/'
		
	App.addInitializer ->
		new Iframe.Router
			controller: API

