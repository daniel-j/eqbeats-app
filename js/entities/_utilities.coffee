@App.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->
	'use strict'
	
	App.commands.setHandler "when:fetched", (entities, callback) ->
		xhrs = _.chain([entities]).flatten().pluck("_fetch").value()

		$.when(xhrs...).done ->
			callback()

	zf = (v) ->
		if v > 9
			""+v;
		else
			"0"+v;

	readableTime = (timems, ignoreMs) ->
		time = timems|0
		if time < 3600
			(time / 60|0)+":"+zf(time % 60)
		else
			(time / 3600|0)+":"+zf((time % 3600)/60|0)+":"+zf((time % 3600)%60)
	
	App.reqres.setHandler "format:time", (s) ->
		readableTime s

	
