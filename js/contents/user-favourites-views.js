// Generated by CoffeeScript 1.6.3
this.App.module('User.Favourites', function(Favourites, App, Backbone, Marionette, $, _) {
  'use strict';
  Favourites.Layout = Marionette.Layout.extend({
    template: '#favourites-layout',
    className: 'favourites',
    regions: {
      info: '#info',
      list: '#list'
    }
  });
  Favourites.Info = Marionette.ItemView.extend({
    template: '#favourites-info',
    tagName: 'div',
    modelEvents: {
      'sync': 'render'
    }
  });
  Favourites.Track = Marionette.ItemView.extend({
    template: '#playlist-track',
    tagName: 'tr'
  });
  return Favourites.List = Marionette.CompositeView.extend({
    template: '#playlist-list',
    itemView: Favourites.Track,
    itemViewContainer: 'tbody'
  });
});
