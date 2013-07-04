define(["utils/xhr", "Track", "User", "Playlist", "utils/helpers"], function (xhr, Track, User, Playlist, helpers) {
	'use strict';

	var api = {};
	var eqBaseUrl = "https://eqbeats.org";

	api.fetchLatest = function(cb) {
		xhr.getJSON(eqBaseUrl+"/tracks/latest/json", function (err, data) {
			if (err) { cb(err, null); return; }
			cb(null, helpers.arrayOf(data, Track));
		});
	}
	api.fetchFeatured = function(cb) {
		xhr.getJSON(eqBaseUrl+"/tracks/featured/json", function (err, data) {
			if (err) { cb(err, null); return; }
			cb(null, helpers.arrayOf(data, Track));
		});
	}
	api.fetchRandom = function(cb) {
		xhr.getJSON(eqBaseUrl+"/tracks/random/json", function (err, data) {
			if (err) { cb(err, null); return; }
			cb(null, helpers.arrayOf(data, Track));
		});
	}

	api.getPlaylist = function(id, cb) {
		xhr.getJSON(eqBaseUrl+"/playlist/"+id+"/json", function (err, data) {
			if (err) { cb(err, null); return; };
			cb(null, new Playlist(data));
		});
	}
	api.getFavourites = function(id, cb) {
		xhr.getJSON(eqBaseUrl+"/user/"+id+"/favorites/json", function (err, data) {
			if (err) { cb(err, null); return; }
			cb(null, helpers.arrayOf(data, Track));
		});
	}
	api.getUser = function(id, cb) {
		xhr.getJSON(eqBaseUrl+"/user/"+id+"/json", function (err, data) {
			if (err) { cb(err, null); return; }
			cb(null, new User(data));
		});
	}
	api.getTrack = function(id, cb) {
		xhr.getJSON(eqBaseUrl+"/track/"+id+"/json", function (err, data) {
			if (err) { cb(err, null); return; }
			cb(null, new Track(data));
		});
	}

	api.searchUsers = function(query, cb) {
		xhr.getJSON(eqBaseUrl+"/users/search/json?q="+encodeURIComponent(query), function (err, data) {
			if (err) { cb(err, null); return; }
			cb(null, helpers.arrayOf(data, User));
		});
	}
	api.searchTracks = function(query, cb) {
		xhr.getJSON(eqBaseUrl+"/tracks/search/json?q="+encodeURIComponent(query), function (err, data) {
			if (err) { cb(err, null); return; }
			cb(null, helpers.arrayOf(data, Track));
		});
	}

	return api;
});