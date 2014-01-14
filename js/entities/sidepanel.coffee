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
		blog: new Sidepanel.MenuItem
			title: "Blog"
			url: "blog"
		queue: new Sidepanel.MenuItem
			title: "Queue"
			url: "queue"
		profile: new Sidepanel.MenuItem
			title: "Profile"
			url: ""
		favourites: new Sidepanel.MenuItem
			title: "★ Favorites"
			url: ""
		separator:
			className: 'separator'

		changeUser: new Sidepanel.MenuItem
			title: 'Change user'
			action: ->
				user = App.request "current:user:entity"

				newUser = prompt("Change current user", user.get 'id')
				
				if newUser != undefined and newUser != '' and newUser != null and !isNaN +newUser
					App.execute 'current:user:set', newUser

	separator = ->
		new Sidepanel.MenuItem menuitems.separator

	menus =
		menuBefore: new Sidepanel.MenuItems [
			menuitems.index
			menuitems.queue
			menuitems.profile
			menuitems.favourites
			separator()
		]

		menuAfter: new Sidepanel.MenuItems [
			separator()
			menuitems.changeUser
			menuitems.blog
		]

	App.vent.on 'current:user:changed', (user) ->
		
		menuitems.profile.set
			title: user.get('name')+"'s profile"
			url: "user/"+user.get('id')
		
		menuitems.favourites.set
			url: "user/"+user.get('id')+"/favorites"

	API =
		getMenu: (menu) ->
			menus[menu]

	App.reqres.setHandler "menu:before:sidepanel:entities", ->
		API.getMenu('menuBefore')

	App.reqres.setHandler "menu:after:sidepanel:entities", ->
		API.getMenu('menuAfter')