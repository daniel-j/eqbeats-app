@App.module 'Lists', (Lists, App, Backbone, Marionette, $, _) ->
	'use strict'

	Lists.Router = Marionette.AppRouter.extend
		appRoutes:
			"featured": "showFeatured"
			"latest": "showLatest"
			"random": "showRandom"

	API =
		showFeatured: ->
			new Lists.Show.Controller
				title: "Featured"
				name: "featured"
		showLatest: ->
			new Lists.Show.Controller
				title: "Latest"
				name: "latest"
		showRandom: ->
			new Lists.Show.Controller
				title: "Random"
				name: "random"
		
	App.addInitializer ->
		new Lists.Router
			controller: API

