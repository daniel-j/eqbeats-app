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

		templateHelpers:
			formattedDate: (timestamp) ->
				months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
				t = new Date(timestamp*1000)
				months[t.getMonth()]+" "+t.getDate()+", "+t.getFullYear()

	Show.Player = Marionette.ItemView.extend
		template: '#track-player-template'
		className: 'track-player'

		modelEvents:
			'sync': 'render'

		events:
			'click button.play-track': -> App.commands.execute "track:play", @model, @
			'click button.add-to-queue': -> App.commands.execute "track:queue:clicked", @model, @

		onRender: ->
			#App.mainRegion.$el.scroll @onScroll
			#@onScroll.apply(App.mainRegion.$el)

		onClose: ->
			#App.mainRegion.$el.unbind 'scroll', @onScroll

		onScroll: ->
			el = $ @
			percent = -(el.scrollTop()/480)*50+75

			
			#el.find(".cover").css
			#	'background-position': 'center '+percent+'%'

