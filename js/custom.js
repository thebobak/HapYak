$(window).ready(function() {

	//init example components
	$('select').formSelect();

	/* Example 1: Set a value of a variable in a video overlay */
	$('#name').on("change",function() { window.hapyakClassicInstance.setData("name",$('#name').val() ) });
	
	/* Example 2: Control the video */
	$('#play').on("click",function() { window.hapyakClassicInstance.play() });
	$('#pause').on("click",function() { window.hapyakClassicInstance.pause() });
	
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
	
	var chords = true;
	$('#chords').on("click",function() { 
		console.log("chords overlay clicked");
		if (chords === true) {
			chords = false;
			window.hapyakClassicInstance.setData("chords", false);
			console.log("chords state: " + chords);
		}
		else {
			chords = true;
			window.hapyakClassicInstance.setData("chords", true);
			console.log("chords state: " + chords);
		}
		
	});
	
	
	/* Example 4: Change player size */
	$('#mini').on("click",function() { window.hapyakClassicInstance.resize(136,102);
		console.log("Mini clicked");
	 });
	$('#max').on("click",function() { window.hapyakClassicInstance.resize(720,540);
		 console.log("max clicked");
	 });
	$('#excessive').on("click",function() { window.hapyakClassicInstance.resize(1440,1080);
		 console.log("excessive clicked");
	 });
	 
	 
	 /* Example 5: Jump to specific time */
 	$('#jump').on("click",function() { window.hapyakClassicInstance.currentTime = 90;
 		console.log("Jump clicked");
 	 });
	 
	 
	 /* Example 6: Button in video controls text on parent page */
	 hapyak.message.addEventListener("message-update", function (e) {
	     $('#messageArea2').text("Messge triggered via hapyak messages " + e.data.color);
	   });


	
	//get instance of HapyakViewer
	
	var vjs = videojs('hapyak-player-157199-8825');
	hapyak.viewer({
		apiKey: "4c5b39201f724da898f5",
		projectId: 390557,
		controls: true,
		resetVariables: true,
		height: '540',
  	  	width: '720',
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
				overlaytoggle: true,
				chords: true,
				pressMe: function() {
					$('#messageArea').text("Message triggered from video");
				}
		    }
	});
	
});
