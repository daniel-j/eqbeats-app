define([], function () {
	'use strict';

	var xhr = {};

	xhr.getJSON = function(url, cb) {
		var x = new XMLHttpRequest();
		x.open('get', url, true);
		console.log(url);
		x.onload = function () {
			try {
				var data = JSON.parse(x.response);
				console.log(data);
			} catch (e) {
				cb(e, null);
				return;
			}
			cb(null, data);
		}
		x.onerror = function () {
			cb("error", null);
		}
		x.send();
		return x;
	}

	return xhr;
});