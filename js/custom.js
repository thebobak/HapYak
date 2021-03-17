/* HapYak API Exploration

This script demonstrates several uses of the HapYak API. It relies on jQuery to simplify DOM interaction.

*/



$(window).ready(function() {
	
	$('.pushpin').pushpin({top:200, offset:20});

	// //init example components
	// $('select').formSelect();

	/* Example 1: Pass a value into the HapYak viewer
	
		Enter text in the textbox to pass the value of the variable "name" into the HapYak viewer
		The value is referenced using {{variable}} syntax in a HapYak annotation, e.g., {{name}}
	
		NOTE: A display rule is set on several components so they will only appear if this value is not empty
	*/
	
	$('#name').on("change",function() {
		window.hapyakClassicInstance.setData("name",$('#name').val() )
	});
	
	
	
	/* Example 2: Control the video */
	
	// Play
	$('#play').on("click",function() {
		window.hapyakClassicInstance.play()
	});
	
	// Pause
	$('#pause').on("click",function() {
		window.hapyakClassicInstance.pause()
	});
	
	// Jump to a specific time
 	$('#jump').on("click",function() {
		window.hapyakClassicInstance.currentTime = 90;
 		console.log("Jump clicked");
 	 });
	
	
	
	
	
	/* Example 3: Use display rules to toggle annotations
	 
	 	These connect to the HapYak viewer using the .setData()
	 	and .getData() methods.
	 
	 	The variables are declared and initialized in the
	 	hapyak.viewer() section at the bottom of this script.
	 
	 	The values of these variables are used in annotation Display Rules
	 
	 */
	 	
	 
	 // Lyrics Button - Interacts with the lyricsOverlay variable
	$('#lyricsButton').on("click",function() { 
		console.log("Lyrics toggle button clicked");
		if (window.hapyakClassicInstance.getData("lyricsOverlay") === true) {
			overlayrule = false;
			window.hapyakClassicInstance.setData("lyricsOverlay", false);
			}
		else {
			overlayrule = true;
			window.hapyakClassicInstance.setData("lyricsOverlay", true);
		}
		
	});
	
	 // Chords Button - Interacts with the chordsOverlay variable
	$('#chordsButton').on("click",function() { 
		console.log("Chords toggle button clicked");
		if (window.hapyakClassicInstance.getData("chordsOverlay") === true) {
			overlayrule = false;
			window.hapyakClassicInstance.setData("chordsOverlay", false); //this connects the page to the hapyak variable
			}
		else {
			overlayrule = true;
			window.hapyakClassicInstance.setData("chordsOverlay", true);
		}
		
	});
	
	// Toggle Switch - Interacts with the toggleSwitch variable
   $('#switch').change( function() {
	   console.log("HapYak var toggleSwitch was: " + window.hapyakClassicInstance.getData("toggleSwitch"));
	   console.log("Toggle switch is now " + $("#switch").prop("checked"));
	   window.hapyakClassicInstance.setData("toggleSwitch", $("#switch").prop("checked"));
	   console.log("HapYak var toggleSwitch is now: " + window.hapyakClassicInstance.getData("toggleSwitch"));
	});

	 

	 /* Example 4: messages
	
		This uses the message.send() method to send data from an iframe annotation to the parent page.
		The event listener below looks for the message and then carries out the function when received.
	
		In this example, the message name is message-updated and it transmits a JSON object to be received by this listener
	
	*/
	 /* This ties into the iframe annotation in this example which sends the message */
	 hapyak.message.addEventListener("message-updater", function (obj) {
	     $('#messageArea').text("Messge triggered via hapyak messages: " + obj.data.textMessage);
	   });

	
	// I'm pretty sure this is not doing anything //
	   
	   
 /* Example 6: Button in video controls text on parent page */
 hapyak.message.addEventListener("bg-color", function (e) {
     $('body').css("background-color", "olive");
   });
	   
/* Example 5: addon
   
	This example uses the hapyak.addon() method. The addon is defined here, and then called from an annotation.
   	This functions similarly to messages, but doesn't require an iframe annotation and can be added to any annotation.
   
   The addon can have various commands. in this example, there is one command "update-text"
   It receives an object from the annotation that calls it
   
   This example uses HapYak time triggers to send different pieces of text to this addon
   
   */
   
   hapyak.addon("time-trigger", {
	   // init command
     init: function () {
       console.log("time-trigger initialized");
     },
	 
	 // Command field from annotation
     "update-text": function (e) { // command-data from annotation object is passed into this function
       $('#messageArea3').text(e.data.info);
     }
   });
	
	
	/* Swap video source - Works...but with some caveats (size/pause/duration)*/
   $('#swap').click(function() {
	   document.querySelector("#hapyak-player-157199-8825_html5_api").src = 
   	"//sample.hapyak-hosted.com/group_uploads/23/16673/videos/862f7e32a9b94974b98f004ae49fa9ef/Sample-Video-with-sound.mp4"
	
   });
	
	
	/* Get instance of HapyakViewer
   
		The basic elements of this come from the Share menu in the HapYak UI.
   		It is important that the apiKey and projectId are correct!
   
   	*/
	
   var vjs = videojs('hapyak-player-395337-8266'); // NOTE: This string matches the ID attribute from the HTML video element
	hapyak.viewer({
		apiKey: "d47fa4d2ed814d858e30",
		projectId: 395337,
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
		/* Variables and functions to pass to the HapYak player */
		variables: {
		        courseName: "Rick 101",
				chordsOverlay: false,
				lyricsOverlay: false,
				toggleSwitch: false,
				pressMe: function() {
					$('#messageArea').text("Message triggered from video");
				}
		    }
	});
	
});