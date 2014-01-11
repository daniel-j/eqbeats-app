@App.module 'Search', (Search, App, Backbone, Marionette, $, _) ->
	'use strict'

	Search.Router = Marionette.AppRouter.extend
		appRoutes:
			"tracks/search?q=:query": "showSearchResult"

	API =
		showSearchResult: (query) ->
			new Search.Result.Controller
				query: query
		
	App.addInitializer ->

		new Search.Router
			controller: API

		App.commands.setHandler 'search:tracks', API.showSearchResult

