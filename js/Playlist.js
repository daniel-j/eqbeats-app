define("Playlist", ["utils/helpers", "User", "Track"], function (helpers, User, Track) {
	'use strict';

	function Playlist(data) {
		if (!User) {
			User = require("User");
		}
		if (!Track) {
			Track = require("Track");
		}
		this.id = data.id;
		this.name = data.name;
		this.description = data.description || null;
		this.html_description = data.html_description || null;
		this.author = data.author? new User(data.author) : null;
		this.tracks = data.tracks? helpers.arrayOf(data.tracks, Track) : null;
		this.link = data.link;
	}


	return Playlist;
});