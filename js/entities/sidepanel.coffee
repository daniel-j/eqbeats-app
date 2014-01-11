@App.module "Entities.Sidepanel", (Sidepanel, App, Backbone, Marionette, $, _) ->
	'use strict'

	Sidepanel.MenuItem = Backbone.Model.extend
		defaults:
			title: ''


	Sidepanel.MenuItems = Backbone.Collection.extend
		model: Sidepanel.MenuItem


	menuitems =
		index: new Sidepanel.MenuItem
			title: "Home"
			url: ""
		queue: new Sidepanel.MenuItem
			title: "Queue"
			url: "queue"
		profile: new Sidepanel.MenuItem
			title: "Profile"
			url: ""
		favourites: new Sidepanel.MenuItem
			title: "★ Favourites"
			url: ""
		separator:
			className: 'separator'

		changeUser: new Sidepanel.MenuItem
			title: 'Change user (for testing)'
			action: ->
				user = App.request "current:user:entity"

				newUser = prompt("Change current user", user.get 'id')
				
				if newUser != undefined and newUser != '' and newUser != null and !isNaN +newUser
					App.execute 'current:user:set', newUser


	premade =
		menu: new Sidepanel.MenuItems [
			menuitems.index
			menuitems.queue
			menuitems.profile
			menuitems.favourites
			new Sidepanel.MenuItem menuitems.separator
			menuitems.changeUser
			new Sidepanel.MenuItem menuitems.separator
		]

	App.vent.on 'current:user:changed', (user) ->
		
		menuitems.profile.set
			title: user.get('name')+"'s profile"
			url: "user/"+user.get('id')
		
		menuitems.favourites.set
			url: "user/"+user.get('id')+"/favourites"

	API =
		getMenu: ->
			premade.menu

	App.reqres.setHandler "menu:sidepanel:entities", ->
		API.getMenu()