@App.module 'View', (View, App, Backbone, Marionette, $, _) ->
	'use strict'

	View.PlaylistTrack = Marionette.ItemView.extend
		template: '#playlist-track'
		tagName: 'tr'

		initialize: ->
			@$el.prop 'tabindex', 0

		events:
			"click button.add-to-queue": -> App.commands.execute "track:queue:clicked", @model, @
			"dblclick": -> App.commands.execute "track:play", @model, @

	View.Playlist = Marionette.CompositeView.extend
		template: '#playlist-list'
		itemView: View.PlaylistTrack
		itemViewContainer: 'tbody'

	View.TracklistBigItem = Marionette.ItemView.extend
		template: '#tracklist-big-item'
		tagName: 'li'

		initialize: ->
			@$el.prop 'tabindex', 0

		events:
			"click button.add-to-queue": -> App.commands.execute "track:queue:clicked", @model, @
			"dblclick": ->
				App.commands.execute "track:play", @model, @

	#	events:
	#		"click button.add-to-queue": -> App.commands.execute "track:queue:clicked", @model, @

	View.TracklistBig = Marionette.CollectionView.extend
		itemView: View.TracklistBigItem
		tagName: 'ul'
		className: 'tracklist-big'
	

	### var PlaylistMetaView = Backbone.Marionette.ItemView.extend({
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
	}, 2000);###
	
	
