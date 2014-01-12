// Generated by CoffeeScript 1.6.3
this.App.module("Entities.Sidepanel", function(Sidepanel, App, Backbone, Marionette, $, _) {
  'use strict';
  var API, menuitems, premade;
  Sidepanel.MenuItem = Backbone.Model.extend({
    defaults: {
      title: ''
    }
  });
  Sidepanel.MenuItems = Backbone.Collection.extend({
    model: Sidepanel.MenuItem
  });
  menuitems = {
    index: new Sidepanel.MenuItem({
      title: "Home",
      url: ""
    }),
    blog: new Sidepanel.MenuItem({
      title: "Blog",
      url: "blog"
    }),
    queue: new Sidepanel.MenuItem({
      title: "Queue",
      url: "queue"
    }),
    profile: new Sidepanel.MenuItem({
      title: "Profile",
      url: ""
    }),
    favourites: new Sidepanel.MenuItem({
      title: "★ Favourites",
      url: ""
    }),
    separator: {
      className: 'separator'
    },
    changeUser: new Sidepanel.MenuItem({
      title: 'Change user',
      action: function() {
        var newUser, user;
        user = App.request("current:user:entity");
        newUser = prompt("Change current user", user.get('id'));
        if (newUser !== void 0 && newUser !== '' && newUser !== null && !isNaN(+newUser)) {
          return App.execute('current:user:set', newUser);
        }
      }
    })
  };
  premade = {
    menu: new Sidepanel.MenuItems([menuitems.index, menuitems.blog, menuitems.queue, menuitems.profile, menuitems.favourites, menuitems.changeUser, new Sidepanel.MenuItem(menuitems.separator)])
  };
  App.vent.on('current:user:changed', function(user) {
    menuitems.profile.set({
      title: user.get('name') + "'s profile",
      url: "user/" + user.get('id')
    });
    return menuitems.favourites.set({
      url: "user/" + user.get('id') + "/favourites"
    });
  });
  API = {
    getMenu: function() {
      return premade.menu;
    }
  };
  return App.reqres.setHandler("menu:sidepanel:entities", function() {
    return API.getMenu();
  });
});
