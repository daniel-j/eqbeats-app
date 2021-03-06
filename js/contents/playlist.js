// Generated by CoffeeScript 1.6.3
this.App.module('Playlist', function(Playlist, App, Backbone, Marionette, $, _) {
  'use strict';
  var API;
  Playlist.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "playlist/:id": "showPlaylist"
    }
  });
  API = {
    showPlaylist: function(id) {
      return new Playlist.Show.Controller({
        id: id
      });
    }
  };
  return App.addInitializer(function() {
    return new Playlist.Router({
      controller: API
    });
  });
});
