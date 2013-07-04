define("User", ["utils/helpers", "Track", "Playlist"], function (helpers, Track, Playlist) {
	'use strict';

	function User(data) {
		if (!Track) {
			Track = require("Track");
		}
		if (!Playlist) {
			Playlist = require("Playlist");
		}
		this.id = data.id;
		this.name = data.name;
		this.avatar = data.avatar;
		this.description = data.description || null;
		this.html_description = data.html_description || null;
		this.tracks = data.tracks? helpers.arrayOf(data.tracks, Track) : null;
		this.playlists = data.playlists? helpers.arrayOf(data.playlists, Playlist) : null;
		this.link = data.link;
	}


	return User;
});