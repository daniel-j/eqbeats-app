@App.module "Components.Loading", (Loading, App, Backbone, Marionette, $, _) ->
	'use strict'

	class Loading.View extends Marionette.ItemView
		template: '#empty-template'
		className: 'loading-container flex'

		onShow: ->
			opts = @_getOptions()
			@$el.spin opts

		onClose: ->
			@$el.spin false

		_getOptions: ->
			lines: 10
			length: 6
			width: 2.5
			radius: 7
			corners: 1
			rotate: 0
			direction: 1
			color: '#000'
			speed: 1.5
			trail: 60
			shadow: false
			hwaccel: true
			className: 'spinner'
			zIndex: 2e9
			top: 'auto'
			left: 'auto'