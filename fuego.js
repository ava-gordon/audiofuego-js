// variable declarations

{
	// Need an annoying complex data structure to represent all data about a sound
	//  This will make adding in sounds super easy though, so it's an overall plus
	var all_sounds = {
		kick: {
			list: [],
			audio: new buzz.sound("assets/kick.wav", { 
				preload: true,
				webAudioApi: true })
		},
		snare: {
			list: [],
			audio: new buzz.sound("assets/snare.wav", { 
				preload: true,
				webAudioApi: true  })
		},
		hihat: {
			list: [],
			audio: new buzz.sound("assets/hihat.wav", { 
				preload: true,
				webAudioApi: true  })
		},
		clap: {
			list: [],
			audio: new buzz.sound("assets/clap.wav", { 
				preload: true,
				webAudioApi: true  })
		}
	}
	var bpm = 120;
	var global_note = 0;
	var last_note = 0;
	var steps = 16;
	var paused = false;
	var runtime;
}

$(function(){
	if(!buzz.isSupported()){
		alert("Use an HTML5 compliant browser!");
	} else {
		setup_grid();
		$("#reset").click(function () { reset_grid(); });
		$("#pause").click(function () { pause(); })
		compute_tempo();
		
		document.getElementById("tempo-slider").oninput = function() {
			bpm = $("#tempo-slider").val();
			$("#tempo-label").text("Tempo: " + bpm);
			compute_tempo();
		};
	}

})

function setup_grid () {
	for (sound in all_sounds) {
		for (var i = 0; i < steps; i++){
			all_sounds[sound]["list"][i] = false;
		}
	}
	render_steps();
}

function run () {

	$(".beat-grid").each(function() {
		var num = $(this).attr("data-num");
		var s = $(this).attr("data-sound");
		if (num == global_note){
			$(this).removeClass("btn-default");
			$(this).removeClass("btn-success");
			if (all_sounds[s]["list"][global_note]){
				$(this).addClass("btn-danger");
			} else {
				$(this).addClass("btn-warning");
			}
		} else if (num == last_note) { // Reset the previous notes to their normal color
			$(this).removeClass("btn-danger");
			$(this).removeClass("btn-warning");
			if (all_sounds[s]["list"][last_note]){
				$(this).addClass("btn-success");
			} else {
				$(this).addClass("btn-default");
			}
		}
	});

	for(sound in all_sounds){
		if(all_sounds[sound]["list"][global_note]){
			all_sounds[sound]["audio"].stop();
			all_sounds[sound]["audio"].play();

		}
	}

	// Last thing to do:
	last_note = global_note; 
	global_note++;
	if(global_note >= steps) global_note = 0;
}

function pause () {
	if(paused){
		compute_tempo();
		paused = false;
	} else {
		clearInterval(runtime);
		paused = true;
	}
}

function compute_tempo () {
	var beat_interval = 60/bpm; //gives us seconds per beat
	var quarter_interval = (beat_interval/4)*1000; //Length of a quarter note in ms
	clearInterval(runtime);
	runtime = setInterval(function() { run(); }, quarter_interval);
}

function reset_grid () {
	for (sound in all_sounds){
		for (var i = 0; i < steps; i++){
			all_sounds[sound]["list"][i] = false;
		}
	}
	$(".beat-grid").each(function() {
		$(this).removeClass("btn-success");
		$(this).removeClass("btn-warning");
		$(this).addClass("btn-default");
	});
}

function select_note ( elem ) {
	var sound = elem.attr("data-sound");
	var num = elem.attr("data-num");
	if (all_sounds[sound]["list"][num]){
		elem.removeClass("btn-success");
		elem.addClass("btn-default");
		all_sounds[sound]["list"][num] = false;
	} else {
		elem.addClass("btn-success");
		elem.removeClass("btn-default");
		all_sounds[sound]["list"][num] = true;
	}
}

function render_steps () {
	for (var i = 0; i < steps; i++){
		for (sound in all_sounds){
			var html_string = '<button class="beat-grid btn btn-default"'
			+ 'data-sound="' + sound + '" '+ 'data-num="' + i + '"'
			+ '></button>';
			el = $(html_string);
			el.click(function(){
				select_note ($(this));
			});
			el.mouseup(function() {
				$(this).blur();
			});
			var row_name = "#"+sound+"-notes";
			$(row_name).append(el);
		}
	}
}