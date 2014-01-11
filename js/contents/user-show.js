// Generated by CoffeeScript 1.6.3
this.App.module('User.Show', function(Show, App, Backbone, Marionette, $, _) {
  'use strict';
  return Show.Controller = App.Controllers.Base.extend({
    initialize: function(options) {
      var id, user,
        _this = this;
      id = options.id;
      user = App.request("user:entity", id);
      this.layout = this.getLayoutView();
      this.listenTo(this.layout, 'show', function() {
        _this.showUserInfoView(user);
        _this.showUserPlaylistsView(user);
        return _this.showUserTracksView(user);
      });
      return this.show(this.layout, {
        loading: {
          entities: user
        }
      });
    },
    showUserInfoView: function(user) {
      var infoView;
      infoView = this.getInfoView(user);
      return this.layout.info.show(infoView);
    },
    showUserPlaylistsView: function(user) {
      var listView;
      listView = this.getPlaylistsView(user);
      return this.layout.playlists.show(listView);
    },
    showUserTracksView: function(user) {
      var listView;
      listView = this.getTracksView(user);
      return this.layout.tracks.show(listView);
    },
    getInfoView: function(user) {
      return new Show.Info({
        model: user
      });
    },
    getPlaylistsView: function(user) {
      return new Show.Playlists({
        collection: user.get('playlists')
      });
    },
    getTracksView: function(user) {
      return new App.View.TracklistBig({
        collection: user.get('tracks')
      });
    },
    getLayoutView: function() {
      return new Show.Layout;
    }
  });
});