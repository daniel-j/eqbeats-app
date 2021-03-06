// Generated by CoffeeScript 1.6.3
this.App.module('Search.Result', function(Result, App, Backbone, Marionette, $, _) {
  'use strict';
  Result.Layout = Marionette.Layout.extend({
    template: '#search-result-template',
    regions: {
      info: '#info',
      result: '#result'
    }
  });
  return Result.Info = Marionette.ItemView.extend({
    template: '#search-result-info'
  });
});
