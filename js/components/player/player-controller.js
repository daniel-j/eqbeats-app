// Generated by CoffeeScript 1.6.3
this.App.module('Player', function(Player, App, Backbone, Marionette, $, _) {
  'use strict';
  var controller;
  this.startWithParent = false;
  controller = null;
  this.addInitializer(function(options) {
    return controller = new Player.Controller(options);
  });
  return Player.Controller = App.Controllers.Base.extend({
    initialize: function() {
      var playerState, track,
        _this = this;
      playerState = App.request("player:state:entity");
      track = playerState.get('trackData');
      this.layout = this.getLayoutView();
      this.listenTo(this.layout, 'show', function() {
        _this.controlsRegion(playerState);
        _this.timeRegion(playerState);
        _this.durationRegion(playerState);
        return _this.progressRegion(playerState);
      });
      return this.show(this.layout);
    },
    controlsRegion: function(playerState) {
      var controlsView;
      controlsView = this.getControlsView(playerState);
      return this.show(controlsView, {
        region: this.layout.controls
      });
    },
    getControlsView: function(playerState) {
      return new Player.Controls({
        model: playerState
      });
    },
    timeRegion: function(playerState) {
      var timeView;
      timeView = this.getTimeView(playerState);
      return this.show(timeView, {
        region: this.layout.time
      });
    },
    getTimeView: function(playerState) {
      return new Player.Time({
        model: playerState,
        template: '#player-time',
        modelEvents: {
          'change:time': 'render'
        }
      });
    },
    durationRegion: function(playerState) {
      var durationView;
      durationView = this.getDurationView(playerState);
      return this.show(durationView, {
        region: this.layout.duration
      });
    },
    getDurationView: function(playerState) {
      return new Player.Time({
        model: playerState,
        template: '#player-duration',
        modelEvents: {
          'change:duration': 'render'
        }
      });
    },
    progressRegion: function(playerState) {
      var progressView;
      progressView = this.getProgressView(playerState);
      return this.show(progressView, {
        region: this.layout.progress
      });
    },
    getProgressView: function(playerState) {
      return new Player.Progress({
        model: playerState
      });
    },
    getLayoutView: function() {
      return new Player.Layout;
    }
  });
  /*
  
  		menuRegion: (menu) ->
  			listView = @getMenuView menu
  
  			listView.on 'itemview:menuitem:clicked', (iv, menuitem) ->
  				if menuitem.has 'url'
  					App.navigate menuitem.get('url'), trigger: true
  
  				if menuitem.has 'action'
  					menuitem.get('action').apply(menuitem)
  
  			@show listView, region: @layout.menu
  
  		playlistsRegion: (user) ->
  			listView = @getPlaylistsView user
  
  			listView.on 'itemview:menuitem:clicked', (iv, playlist) ->
  				App.navigate "playlist/"+playlist.get('id'), trigger: true
  
  			@show listView, region: @layout.playlists
  
  
  		getMenuView: (menu) ->
  			new Sidepanel.Menu
  				collection: menu
  
  		getPlaylistsView: (user) ->
  			new Sidepanel.Menu
  				collection: user.get('playlists')
  */

});
