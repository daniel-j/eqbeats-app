// Generated by CoffeeScript 1.6.3
this.App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
  'use strict';
  var readableTime, zf;
  App.commands.setHandler("when:fetched", function(entities, callback) {
    var xhrs;
    xhrs = _.chain([entities]).flatten().pluck("_fetch").value();
    return $.when.apply($, xhrs).done(function() {
      return callback();
    });
  });
  zf = function(v) {
    if (v > 9) {
      return "" + v;
    } else {
      return "0" + v;
    }
  };
  readableTime = function(timems, ignoreMs) {
    var time;
    time = timems | 0;
    if (time < 3600) {
      return (time / 60 | 0) + ":" + zf(time % 60);
    } else {
      return (time / 3600 | 0) + ":" + zf((time % 3600) / 60 | 0) + ":" + zf((time % 3600) % 60);
    }
  };
  return App.reqres.setHandler("format:time", function(s) {
    return readableTime(s);
  });
});
