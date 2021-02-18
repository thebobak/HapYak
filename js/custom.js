$(window).ready(function() {

	//init example components
	$('select').formSelect();

	/* Example 1: Set a value of a variable in a video overlay */
	$('#name').on("change",function() { window.hapyakClassicInstance.setData("name",$('#name').val() ) });
	
	/* Example 2: Play the video */
	$('#play').on("click",function() { window.hapyakClassicInstance.play() });
	
	/* Example 3: Toggle an annotation */
	var overlayrule = true;
	$('#overlay').on("click",function() { 
		console.log("toggle overlay clicked");
		if (overlayrule === true) {
			overlayrule = false;
			window.hapyakClassicInstance.setData("overlaytoggle", false);
			console.log("overlayrule state: " + overlayrule);
		}
		else {
			overlayrule = true;
			window.hapyakClassicInstance.setData("overlaytoggle", true);
			console.log("overlayrule state: " + overlayrule);
		}
		
	});

	
	//get instance of HapyakViewer
	
	var vjs = videojs('hapyak-player-157199-8825');
	hapyak.viewer({
		apiKey: "4c5b39201f724da898f5",
		projectId: 390557,
		controls: true,
		resetVariables: true,
		player: vjs,
		videoType: "html5",
		playerType: "videojs4",
		autoplay: false,
		plugins: { cdn: { api: { enabled: false } } }, /* Turn off caching while testing */
		onload: function(viewer) { /* Get a reference to the HapYakViewer Object and set it on the window for convenience */
	        window.hapyakClassicInstance = viewer;
	    },
		variables: {
		        courseName: "Rick 101",
				overlaytoggle: true
		    }
	});
	
});
