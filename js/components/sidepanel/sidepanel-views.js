// Generated by CoffeeScript 1.6.3
this.App.module('Sidepanel', function(Sidepanel, App, Backbone, Marionette, $, _) {
  'use strict';
  Sidepanel.Layout = Marionette.Layout.extend({
    template: '#sidepanel',
    regions: {
      menu: '#menu',
      playlists: '#playlists',
      trackinfo: '#trackinfo-region'
    }
  });
  Sidepanel.MenuItem = Marionette.ItemView.extend({
    getTemplate: function() {
      if (this.model.get('className') !== 'separator') {
        return '#sidepanel-menuitem';
      } else {
        return '#empty-template';
      }
    },
    tagName: 'li',
    className: function() {
      return this.model.get('className');
    },
    modelEvents: {
      'change': 'render'
    },
    events: {
      'click span': 'clicked'
    },
    clicked: function() {
      return this.trigger('menuitem:clicked', this.model);
    }
  });
  Sidepanel.Menu = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: Sidepanel.MenuItem
  });
  return Sidepanel.Trackinfo = Marionette.ItemView.extend({
    template: '#trackinfo-template',
    className: 'trackinfo-wrapper',
    modelEvents: {
      'change': 'render'
    },
    onRender: function() {
      var urlMedium, urlPlaceholder, urlThumb;
      urlPlaceholder = "img/album-placeholder.png";
      if (!this.model.get('download')) {
        return;
      }
      if (this.model.get('download').art) {
        urlMedium = this.model.get('download').art + "/medium";
        urlThumb = this.model.get('download').art + "/thumb";
      } else {
        urlMedium = urlThumb = urlPlaceholder;
      }
      $("#coverart").prop('src', urlPlaceholder);
      $("#coverart").prop('src', urlMedium);
      return $("#coverart-thumb").css({
        'background-image': "url('" + urlThumb + "')"
      });
    }
  });
});