define(['EventEmitter'], function (EventEmitter) {
	'use strict';

	var historyManager = Object.create(new EventEmitter);

	var controllerSections = {
		"": "home",
		"search": "search",
		"queue": "queue",
		"blog": "blog",
		"favourites": "playlist",
		"playlist": "playlist",
		"user": "user",
		"settings": "settings"
	};

	var leftMenu = document.getElementById('left-menu');
	var contents = document.querySelector("#contents");

	var currentLeftMenuItem = null;
	var currentSectionItem = null;
	var lastUrl = null;

	var leftMenu = document.getElementById('left-menu');
	leftMenu.addEventListener("click", handleLeftMenuEvent, false);
	leftMenu.addEventListener("keydown", handleLeftMenuEvent, false);
	function handleLeftMenuEvent(e) {
		if (e.target && e.target.nodeName === "SPAN" && (!e.keyCode || e.keyCode === 13 || e.keyCode === 32)) {

			var url = typeof e.target.dataset.url === "string" ? e.target.dataset.url : null;

			if (url !== null && lastUrl !== url) {
				history.pushState(null, null, basePath+url);
				handleUrl(url);
			}

			if (currentLeftMenuItem) {
				currentLeftMenuItem.classList.remove("selected");
				currentLeftMenuItem = null;
			}

			var li = e.target.parentNode;
			while (li.nodeName !== "LI") {
				li = li.parentNode;
			}
			
			li.classList.add("selected");
			currentLeftMenuItem = li;
			
			e.preventDefault();
		}
	}

	function handleUrl(url) {
		if (url.indexOf(basePath) === 0) {
			url = url.substr(basePath.length);
		}
		
		if (lastUrl === url) {
			return;
		}
		lastUrl = url;
		
		var urlInfo = url.split("/");
		var controller = urlInfo[0];
		var section = controllerSections[controller];

		
		var sectionItem = contents.querySelector("#section-"+section);
		if (sectionItem) {
			if (currentSectionItem) {
				currentSectionItem.classList.remove("active");
				currentSectionItem = null;
			}
			sectionItem.classList.add("active");
			currentSectionItem = sectionItem;
		} else {
			alert("The page you requested does not exist");
			var url = basePath;
			history.replaceState(null, null, url);
			handleUrl(url);
		}
		var leftListItem = leftMenu.querySelector("li span[data-url='"+url+"']");
		if (leftListItem) {
			if (currentLeftMenuItem) {
				currentLeftMenuItem.classList.remove("selected");
				currentLeftMenuItem = null;
			}
			var li = leftListItem.parentNode;
			while (li.nodeName !== "LI") {
				li = li.parentNode;
			}
			
			li.classList.add("selected");
			currentLeftMenuItem = li;
		}
		historyManager.emit('state', {
			url: url,
			controller: controller,
			section: section,
			info: urlInfo.slice(1),
			state: history.state
		});
	}
	function initialize() {
		window.addEventListener("popstate", function (e) {
			handleUrl(document.location.pathname);
		}, false);

		handleUrl(document.location.pathname);

		historyManager.handleUrl = handleUrl;
	}
	historyManager.initialize = initialize;

	return historyManager;
});