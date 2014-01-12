@App.module 'Iframe.Show', (Show, App, Backbone, Marionette, $, _) ->
	'use strict'

	Show.Controller = App.Controllers.Base.extend
		initialize: (options) ->

			{ url } = options

			model = new Backbone.Model
				url: url

			@iframeView = @getIframeView model
			@show @iframeView
			
		getIframeView: (model) ->
			new Show.IframeView
				model: model
		
		getLayoutView: ->
			new Show.Layout
