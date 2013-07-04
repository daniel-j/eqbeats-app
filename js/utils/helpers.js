define([], function () {
	'use strict';
	var helpers = {};

	helpers.arrayOf = function(a, C) {
		var arr = [];
		for (var i = 0; i < a.length; i++) {
			arr[i] = new C(a[i]);
		}
		return arr;
	}

	return helpers;
});