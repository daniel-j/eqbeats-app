// Generated by CoffeeScript 1.6.3
this.App.module('Sidepanel', function(Sidepanel, App, Backbone, Marionette, $, _) {
  'use strict';
  var controller;
  this.startWithParent = false;
  controller = null;
  this.addInitializer(function(options) {
    return controller = new Sidepanel.Controller(options);
  });
  return Sidepanel.Controller = App.Controllers.Base.extend({
    initialize: function() {
      var menuAfter, menuBefore, track, user,
        _this = this;
      menuBefore = App.request("menu:before:sidepanel:entities");
      menuAfter = App.request("menu:after:sidepanel:entities");
      user = App.request("current:user:entity");
      track = App.request("current:track:entity");
      this.layout = this.getLayoutView();
      this.listenTo(this.layout, 'show', function() {
        _this.menuRegion(menuBefore, _this.layout.menuBefore);
        _this.menuRegion(menuAfter, _this.layout.menuAfter);
        _this.playlistsRegion(user);
        return _this.trackInfoRegion(track);
      });
      return this.show(this.layout);
    },
    menuRegion: function(menu, region) {
      var listView;
      listView = this.getMenuView(menu);
      this.listenTo(listView, 'itemview:menuitem:clicked', function(iv, menuitem) {
        if (menuitem.has('url')) {
          App.navigate(menuitem.get('url'), {
            trigger: true
          });
        }
        if (menuitem.has('action')) {
          return menuitem.get('action').apply(menuitem);
        }
      });
      return this.show(listView, {
        region: region
      });
    },
    playlistsRegion: function(user) {
      var listView;
      listView = this.getPlaylistsView(user);
      this.listenTo(listView, 'itemview:menuitem:clicked', function(iv, playlist) {
        return App.navigate("playlist/" + playlist.get('id'), {
          trigger: true
        });
      });
      return this.show(listView, {
        region: this.layout.playlists
      });
    },
    trackInfoRegion: function(track) {
      var infoView;
      infoView = this.getTrackInfoView(track);
      return this.show(infoView, {
        region: this.layout.trackinfo
      });
    },
    getMenuView: function(menu) {
      return new Sidepanel.Menu({
        collection: menu
      });
    },
    getPlaylistsView: function(user) {
      return new Sidepanel.Menu({
        collection: user.get('playlists')
      });
    },
    getTrackInfoView: function(track) {
      return new Sidepanel.Trackinfo({
        model: track
      });
    },
    getLayoutView: function() {
      return new Sidepanel.Layout;
    }
  });
});
