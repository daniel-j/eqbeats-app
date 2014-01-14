// Generated by CoffeeScript 1.6.3
this.App.module('View', function(View, App, Backbone, Marionette, $, _) {
  'use strict';
  View.EmptyNothingLi = Marionette.ItemView.extend({
    template: '#empty-nothing',
    tagName: 'li',
    className: 'empty'
  });
  View.PlaylistTrack = Marionette.ItemView.extend({
    template: '#playlist-track',
    tagName: 'tr',
    initialize: function() {
      return this.$el.prop('tabindex', 0);
    },
    events: {
      "click button.add-to-queue": function() {
        return App.commands.execute("track:queue:clicked", this.model, this);
      },
      "click button.remove-from-list": function() {
        console.log(this);
        return this.model.collection.remove(this.model);
      },
      "click .art-thumb": "playTrack",
      "dblclick": "playTrack"
    },
    playTrack: function() {
      return App.commands.execute("track:play", this.model, this);
    }
  });
  View.Playlist = Marionette.CompositeView.extend({
    template: '#playlist-list',
    id: 'playlist-layout',
    itemView: View.PlaylistTrack,
    itemViewContainer: 'tbody',
    appendHtml: function(collectionView, itemView, index) {
      var children, childrenContainer;
      if (collectionView.isBuffering) {
        return collectionView.elBuffer.appendChild(itemView.el);
      } else {
        childrenContainer = collectionView.itemViewContainer && collectionView.$(collectionView.itemViewContainer) || collectionView.$el;
        children = childrenContainer.children();
        if (children.size() <= index) {
          return childrenContainer.append(itemView.el);
        } else {
          return children.eq(index).before(itemView.el);
        }
      }
    }
  });
  View.TracklistBigItem = Marionette.ItemView.extend({
    template: '#tracklist-big-item',
    tagName: 'li',
    initialize: function() {
      return this.$el.prop('tabindex', 0);
    },
    events: {
      "click button.add-to-queue": function() {
        return App.commands.execute("track:queue:clicked", this.model, this);
      },
      "dblclick": "playTrack",
      "click .art-thumb": "playTrack"
    },
    playTrack: function() {
      return App.commands.execute("track:play", this.model, this);
    }
  });
  return View.TracklistBig = Marionette.CollectionView.extend({
    itemView: View.TracklistBigItem,
    tagName: 'ul',
    className: 'tracklist-big',
    emptyView: View.EmptyNothingLi
  });
  /* var PlaylistMetaView = Backbone.Marionette.ItemView.extend({
  		template: '#playlist-meta',
  		tagName: 'div'
  	});
  
  	var TrackView = Backbone.Marionette.ItemView.extend({
  		template: '#test-track',
  		tagName: 'tr'
  	});
  	var TrackList = Backbone.Marionette.CompositeView.extend({
  		template: '#playlist-list',
  		tagName: 'tbody',
  		itemView: TrackView
  	});
  
  	var PlaylistLayout = Backbone.Marionette.Layout.extend({
  		template: '#playlist',
  
  		regions: {
  			meta: '.meta',
  			list: '.list'
  		}
  	});
  
  	var layout = new PlaylistLayout();
  
  	var playlist = new App.Model.Playlist({id: 81});
  
  	var view = new TrackList({collection: playlist.get('collection')});
  	var meta = new PlaylistMetaView({model: playlist});
  
  
  	playlist.on('sync', function () {
  		console.log(this);
  		
  		App.mainRegion.show(layout);
  
  		layout.meta.show(meta);
  		layout.list.show(view);
  		
  	});
  
  	
  	playlist.fetch();
  
  	setTimeout(function () {
  		playlist.set('id', 58);
  		playlist.fetch();
  	}, 2000);
  */

});
