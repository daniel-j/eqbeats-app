@App.module 'View', (View, App, Backbone, Marionette, $, _) ->
	'use strict'

	View.EmptyNothingLi = Marionette.ItemView.extend
		template: '#empty-nothing'
		tagName: 'li'
		className: 'empty'



	View.PlaylistTrack = Marionette.ItemView.extend
		template: '#playlist-track'
		tagName: 'tr'

		initialize: ->
			@$el.prop 'tabindex', 0

		events:
			"click button.add-to-queue": -> App.commands.execute "track:queue:clicked", @model, @
		#	"click button.view-track": -> App.navigate "track/"+@model.get('id')
			"click button.remove-from-list": ->
				console.log @
				@model.collection.remove @model
			"click .art-thumb": "playTrack"
			"dblclick": "playTrack"
			"keydown": "handleKeydown"

		handleKeydown: (e) ->
			kc = e.keyCode
			if kc == 38
				@$el.prev().focus()
			else if kc == 40
				@$el.next().focus()
			else if kc == 13
				@playTrack()
			else
				return
			e.preventDefault()

		playTrack: ->
			App.commands.execute "track:play", @model, @

	View.Playlist = Marionette.CompositeView.extend
		template: '#playlist-list'
		id: 'playlist-layout'
		itemView: View.PlaylistTrack
		itemViewContainer: 'tbody'

		appendHtml: (collectionView, itemView, index) ->
			if collectionView.isBuffering
				# buffering happens on reset events and initial renders
				# in order to reduce the number of inserts into the
				# document, which are expensive.
				collectionView.elBuffer.appendChild itemView.el
			
			else
				# If we've already rendered the main collection, just
				# append the new items directly into the element.
				# collectionView.$el.append itemView.el

				childrenContainer = collectionView.itemViewContainer and collectionView.$(collectionView.itemViewContainer) or collectionView.$el
				children = childrenContainer.children()
				if children.size() <= index
					childrenContainer.append itemView.el
				else
					children.eq(index).before itemView.el




	View.TracklistBigItem = Marionette.ItemView.extend
		template: '#tracklist-big-item'
		tagName: 'li'

		initialize: ->
			@$el.prop 'tabindex', 0

		events:
			"click button.add-to-queue": -> App.commands.execute "track:queue:clicked", @model, @
			"dblclick": "playTrack"
			"click .art-thumb": "playTrack"
			"keydown": "handleKeydown"

		handleKeydown: (e) ->
			kc = e.keyCode
			if kc == 38
				@$el.prev().focus()
			else if kc == 40
				@$el.next().focus()
			else if kc == 13
				@playTrack()
			else
				return
			e.preventDefault()

		playTrack: ->
			App.commands.execute "track:play", @model, @

	View.TracklistBig = Marionette.CollectionView.extend
		itemView: View.TracklistBigItem
		tagName: 'ul'
		className: 'tracklist-big'
		emptyView: View.EmptyNothingLi
	

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
	
	
