// Generated by CoffeeScript 1.6.3
this.App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  'use strict';
  var API, doPrefill, premade;
  Entities.User = Backbone.Model.extend({
    url: function() {
      return config.host + "/user/" + this.id + "/json";
    },
    initialize: function() {
      this.set('tracks', new Entities.Tracks);
      return this.set('playlists', new Entities.Playlists);
    },
    parse: function(resp, options) {
      this.get('tracks').set(resp.tracks);
      this.get('playlists').set(resp.playlists);
      delete resp.tracks;
      delete resp.playlists;
      return resp;
    },
    defaults: {
      name: '',
      avatar: '',
      description: '',
      html_description: ''
    }
  });
  Entities.Track = Backbone.Model.extend({
    url: function() {
      return config.host + "/track/" + this.id + "/json";
    },
    defaults: {
      title: '',
      artist: {
        name: ''
      }
    },
    idAttribute: '_no_id_'
  });
  Entities.Playlist = Backbone.Model.extend({
    url: function() {
      return config.host + "/playlist/" + this.id + "/json";
    },
    initialize: function() {
      return this.set('collection', new Entities.Tracks);
    },
    parse: function(resp, options) {
      this.get('collection').set(resp.tracks);
      return resp;
    },
    defaults: {
      name: '',
      author: {
        name: ''
      },
      description: '',
      html_description: ''
    }
  });
  Entities.SimplePlaylist = Backbone.Model.extend({
    defaults: {
      name: '',
      author: {
        name: ''
      },
      description: '',
      html_description: ''
    }
  });
  Entities.Favourites = Backbone.Model.extend({
    url: function() {
      return config.host + '/user/' + this.id + '/favorites/json';
    },
    initialize: function() {
      return this.set('tracks', new Entities.Tracks);
    },
    parse: function(resp, options) {
      this.get('tracks').set(resp);
      return {};
    }
  });
  Entities.Featured = Backbone.Collection.extend({
    model: Entities.Track,
    url: config.host + '/tracks/featured/json'
  });
  Entities.Latest = Backbone.Collection.extend({
    model: Entities.Track,
    url: config.host + '/tracks/latest/json'
  });
  Entities.Random = Backbone.Collection.extend({
    model: Entities.Track,
    url: config.host + '/tracks/random/json'
  });
  Entities.Tracks = Backbone.Collection.extend({
    model: Entities.Track
  });
  Entities.Playlists = Backbone.Collection.extend({
    model: Entities.SimplePlaylist
  });
  Entities.QueuedTracks = Backbone.Collection.extend({
    model: Entities.Track
  });
  premade = {
    featured: new Entities.Featured,
    latest: new Entities.Latest,
    queue: new Entities.QueuedTracks,
    currentUser: new Entities.User
  };
  doPrefill = false;
  premade.currentUser.on('all', function(ev) {});
  premade.currentUser.on('sync', function() {
    localStorage.eqbeatsCurrentUserId = this.get('id');
    return App.vent.trigger("current:user:changed", this);
  });
  premade.queue.on('add', function() {
    return App.vent.trigger("queue:track:added");
  });
  premade.queue.on('remove', function() {
    return App.vent.trigger("queue:track:removed");
  });
  API = {
    getCurrentUser: function() {
      return premade.currentUser;
    },
    getFeatured: function() {
      premade.featured = new Entities.Featured;
      premade.featured.fetch({
        prefill: doPrefill
      });
      return premade.featured;
    },
    getLatest: function() {
      premade.latest = new Entities.Latest;
      premade.latest.fetch({
        prefill: doPrefill
      });
      return premade.latest;
    },
    getUser: function(id) {
      var user;
      user = new Entities.User({
        id: id
      });
      user.fetch({
        prefill: doPrefill
      });
      return user;
    },
    getUserFavourites: function(id) {
      var favourites;
      favourites = new Entities.Favourites({
        id: id
      });
      favourites.fetch({
        prefill: doPrefill
      });
      return favourites;
    },
    getPlaylist: function(id) {
      var playlist;
      playlist = new Entities.Playlist({
        id: id
      });
      playlist.fetch({
        prefill: doPrefill
      });
      return playlist;
    },
    getQueue: function() {
      return premade.queue;
    },
    setCurrentUser: function(id) {
      premade.currentUser.set({
        id: id
      }, {
        silent: true
      });
      premade.currentUser.fetch({
        prefill: doPrefill
      });
      return premade.currentUser;
    },
    addToQueue: function(track) {
      var model;
      model = new Entities.Track(track.toJSON());
      model.set('_id', model.get('id'), {
        silent: true
      });
      model.unset('id', {
        silent: true
      });
      premade.queue.push(model, {
        silent: true
      });
      model.set('id', model.get('_id'), {
        silent: true
      });
      model.unset('_id', {
        silent: true
      });
      return premade.queue.trigger('add', model, premade.queue, {});
    }
  };
  App.reqres.setHandler("current:user:entity", function() {
    return API.getCurrentUser();
  });
  App.reqres.setHandler("featured:entities", function() {
    return API.getFeatured();
  });
  App.reqres.setHandler("latest:entities", function() {
    return API.getLatest();
  });
  App.reqres.setHandler("user:entity", function(id) {
    return API.getUser(id);
  });
  App.reqres.setHandler("user:favourites:entities", function(id) {
    return API.getUserFavourites(id);
  });
  App.reqres.setHandler("playlist:entity", function(id) {
    return API.getPlaylist(id);
  });
  App.reqres.setHandler("queue:entities", function() {
    return API.getQueue();
  });
  App.commands.setHandler('current:user:set', function(id) {
    return API.setCurrentUser(id);
  });
  return App.commands.setHandler('track:queue:clicked', function(track, child) {
    return API.addToQueue(track);
  });
});