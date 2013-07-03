<?php
	$basepath = dirname($_SERVER["SCRIPT_NAME"])."/";
?>
<!doctype html>
<html>
<head>
	<title>Equestrian Beats</title>
	<meta charset="utf-8">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<link rel="stylesheet/less" href="<?php echo $basepath; ?>style.less" type="text/css">

	<script src="<?php echo $basepath; ?>js/lib/less.min.js" type="text/javascript"></script>
</head>
<body>

<div id="wrapper">
	<div class="flex-columns main-wrapper">
		<section class="left-pane">
			<ul id="left-menu">
				<li id="searchbar-wrap"><input type="search" id="searchbar" placeholder="Search"></li>
				<li id="nav-home"><span tabindex="0" data-url="" data-section="home">Home</span></li>
				<li id="nav-queue"><span tabindex="0" data-url="queue" data-section="queue">Play queue</span></li>
				<li id="nav-blog"><span tabindex="0" data-url="blog" data-section="blog">Blog</span></li>
				<li class="separator"></li>
				<li><span tabindex="0" data-url="playlist/81" data-section="playlist">My pony playlist</span></li>
				<li><span tabindex="0" data-url="playlist/35" data-section="playlist">Another playlist. But with a longer name.</span></li>
				<li><span tabindex="0" data-url="playlist/2" data-section="playlist">Another playlist of mine</span></li>
				<li class="separator"></li>
				<li id="nav-settings"><span tabindex="0" data-url="settings" data-section="settings">Settings</span></li>
			</ul>
		
			<div class="trackinfo">
				<input type="checkbox" id="toggle-trackinfo" class="invisible" checked>
				<label for="toggle-trackinfo">
					<div class="coverart-wrap"><img id="coverart" src="https://eqbeats.org/track/3408/art/medium"></div>
					<div id="coverart-thumb" class="art-thumb" style="background-image: url('https://eqbeats.org/track/3408/art/thumb');"></div>
				</label>
				<div class="trackinfo-wrapper">
					<div id="track-title-wrapper" class="marquee"><span><a href="javascript:" id="track-title" tabindex="-1">This song has a very long title! YAY! Text ellipsis!</a></span></div>
					<div id="track-artist-wrapper" class="marquee"><span><a href="javascript:" id="track-artist" tabindex="-1">Click cover to toggle mode (pure CSS+HTML)</a></span></div>
				</div>
			</div>
			
		</section>

		<div id="contents" class="flex">
			<section id="section-home">
				
				<div class="tracklist-big-wrap">
					<h1>Equestrian Beats</h1>
					<h2>The web app!</h2>
					<br>
					Best viewed in Google Chrome 28+ and Firefox 22+. This is under development.<br>
					Currently working on the design, not much JavaScript added yet. Basic browser history navigation support implemented.
					<br><br>
					<em>djazz</em>
					<br>
					<br>
					<br>
				</div>

				<div class="tracklist-big-wrap">
					<div class="left">
						<h3><a href="./#!/latest">Latest</a></h3>
						<ul class="tracklist-big">
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/3408/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">yey</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone with a very long name! long long long</a></div>
							</li>
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/5248/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">yey</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone</a></div>
							</li>
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/5248/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">yey</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone</a></div>
							</li>
						</ul>
					</div>
					<div class="left">
						<h3><a href="./#!/featured">Featured</a></h3>
						<ul class="tracklist-big">
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/5248/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">yey</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone</a></div>
							</li>
						</ul>
					</div>
					<div class="left">
						<h3><a href="./#!/random">Random</a></h3>
						<ul class="tracklist-big">
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/5248/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">yey</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone</a></div>
							</li>
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/5248/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">yey</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone</a></div>
							</li>
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/5248/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">A very long title this is. Chimicherry Cherrychanga</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone</a></div>
							</li>
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/5248/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">yey</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone</a></div>
							</li>
							<li tabindex="0">
								<div class="art art-thumb" style="background-image: url('https://eqbeats.org/track/5248/art/thumb');"></div>
								<div><a class="title" href="javascript:" tabindex="-1">yey</a></div>
								<div><a class="artist" href="javascript:" tabindex="-1">someone</a></div>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section id="section-search">
				<h1>Search results</h1>
			</section>

			<section id="section-queue">
				<h1>Play queue</h1>
			</section>

			<section id="section-blog">
				<iframe src="http://blog.eqbeats.org/" id="iframe-blog"></iframe>
			</section>

			<section id="section-playlist">
				<h1>A playlist</h1>
			</section>

			<section id="section-user">
				<h1>User page</h1>
			</section>

			<section id="section-settings">
				<h1>Settings</h1>
			</section>
		</div>
	</div>

	<section class="bottombar">
		<div class="playercontrols">
			<button id="prev-track-btn" disabled><div></div></button>
			<button id="play-pause-track-btn"></button>
			<button id="next-track-btn"><div></div></button>
			<span class="playerTime" id="timeElapsed">0:19</span>
			<div class="progressbar" id="progress-song">
				<div class="progressbar-track">
					<div class="progressbar-loaded"></div>
					<div class="progressbar-progress">
						<div class="progressbar-scrubber" tabindex="0"></div>
					</div>
				</div>
			</div>
			<span class="playerTime" id="timeTotal">5:01</span>
			<label class="repeat-wrap" id="track-repeat">
				<input type="checkbox" class="repeat-checkbox" id="repeat-box"/>
				<div class="repeat-background"></div>
				<div for="repeat-box" class="repeat-overlay"><div></div></div>
			</label>
		</div>
	</section>
</div>

<script>
var basePath = "<?php echo $basepath; ?>";
</script>
<script data-main="<?php echo $basepath; ?>js/main" src="<?php echo $basepath; ?>js/lib/require.min.js"></script>
</body>
</html>