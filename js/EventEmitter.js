// Made by djazz

define(function () {
	'use strict';

	function EventEmitter() {
		this.events = {};
	}
	
	
	EventEmitter.prototype.emit = function (name, value) {
		if (this.events[name] && this.events[name].length > 0) {
			for (var i = 0; i < this.events[name].length; i++) {
				this.events[name][i].call(this, value);
			}
		}
	}
	EventEmitter.prototype.on = function (name, callback) {
		this.events[name] = this.events[name] || [];
		this.events[name].push(callback);
	}
	EventEmitter.prototype.off = function (name, callback) {
		var index;
		if (this.events[name]) {
			for (var i = 0; i < this.events[name].length; i++) {
				if ((index = this.events[name].indexOf(callback)) > -1) {
					this.events[name].splice(index, 1);
				}
			}
			if (this.events[name].length === 0) {
				delete this.events[name];
			}
		}
	}
	return EventEmitter;
});