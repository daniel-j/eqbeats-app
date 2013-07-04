define("Track", ["User"], function (User) {
	'use strict';

	function Track(data) {
		if (!User) {
			Track = require("User");
		}
		this.id = data.id;
		this.title = data.title;
		this.description = data.description;
		this.html_description = data.html_description;
		this.artist = data.artist? new User(data.artist) : null;
		this.link = data.link;
		this.download = data.download;
		this.stream = data.stream;
	}


	return Track;
});