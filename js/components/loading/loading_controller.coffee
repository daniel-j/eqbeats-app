@App.module "Components.Loading", (Loading, App, Backbone, Marionette, $, _) ->
	'use strict'

	class Loading.Controller extends App.Controllers.Base
		initialize: (options) ->
			{ view, config } = options

			_.defaults config,
				entities: @getEntities(view)

			loadingView = @getLoadingView()
			@show loadingView

			@showRealView view, loadingView, config

		showRealView: (realView, loadingView, config) ->
			App.execute "when:fetched", config.entities, =>
				

				return realView.close() if !@region or @region.currentView isnt loadingView
				@show realView
				

		getEntities: (view) ->
			_.chain(view).pick("model", "collection").toArray().compact().value()

		getLoadingView: ->
			new Loading.View

	App.commands.setHandler "show:loading", (view, options) ->
		new Loading.Controller
			view: view
			region: options.region
			config: options.loading