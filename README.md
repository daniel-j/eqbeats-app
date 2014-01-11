Equestrian Beats web app by djazz
===

What is it?
---
This is a web app using the eqbeats public json api to let you browse eqbeats without music interrupts! It is a music player with support for viewing the toplists, playlists and browse other artists music!

Try it out!
---
Live demo: http://djazz.se/apps/eqbeats/

Screenshot: http://i.imgur.com/JIRRUpg.png

Installation
---
You could install this on your own server, or you can even use it locally if you compile the LESS stylesheet to CSS first, because it's using Ajax (can't fetch stuff locally).
Just clone this repo into a directory and enjoy! It's all static files so it should work on any webserver (apache, nginx, express..)

There isn't much to configure, it works out of the box!

Features
---
 * Listen to your and others playlists
 * Browse other artists tracks and playlists
 * Discover new music
 * Queue tracks
 * Search for tracks

Todo/missing features
---
 * Login/authentication
 * Add tracks to playlists, create playlists, favourite tracks, upload music..
 * Repeat/shuffle playback
 * Better navigation in lists of tracks
 * Be able to control music playback with keyboard
 * Cache playlists, tracks, user pages..
 * Offline usage (sync playlists)
 * Track pages
 * Responsive design for smaller screens
 * Mobile support (Android, iOS..)
 * Context menu on tracks, right now only tracks in playlists are queueable

Thanks
---
The app is written in CoffeeScript and relies on the MVC framework Marionette (extended from Backbone), originally created by Derick Bailey.

Many thanks to Brian Mann for his Marionette+Backbone screencast series over at http://www.backbonerails.com/

Also a big thanks to the eqbeats developers, for fixing API bugs and other stuff!


Other links
---
 * Equestrian Beats website: https://eqbeats.org/
 * Marionette website: http://marionettejs.com/
 * Backbone documentation: http://backbonejs.org/
 * Old screenshot: http://i.imgur.com/pAkkQ0b.png
