// variable declarations

{
	var all_sounds = {
		kick: [],
		snare: [],
		hihat: [],
		clap: []
	}
	var bpm = 120;
	var kick_sound = new buzz.sound("assets/kick", {
		formats: ["ogg", "mp3"]
	});
	var snare_sound = new buzz.sound("assets/snare", {
		formats: ["ogg", "mp3"]
	});
	var hihat_sound = new buzz.sound("assets/hihat", {
		formats: ["ogg", "mp3"]
	});
	var clap_sound = new buzz.sound("assets/clap", {
		formats: ["ogg", "mp3"]
	});
	var paused = false;
	var beat_interval = 60/bpm; //gives us seconds per beat
	var quarter_interval = beat_interval/4; //Length of a quarter note
	var global_note = 0;
	var steps = 16;
}

$(function(){
	if(!buzz.isSupported()){
		alert("Use an HTML5 compliant browser!");
	} else {
		setup_grid();
		//var runtime = setInterval(function() { run(); }, quarter_interval);
	}

})

function setup_grid () {
	for (sound in all_sounds) {
		for (var i = 0; i < steps; i++){
			all_sounds[sound][i] = false;
		}
	}
	render_steps();
}

function run () {

}

function pause () {

}

function reset () {

}

function select_note ( num, sound, elem ) {
	console.log("selected: " + sound + ": "+num);
	if (all_sounds[sound][num]){
		elem.removeClass("btn-success");
		elem.addClass("btn-default");
		all_sounds[sound][num] = false;
	} else {
		elem.addClass("btn-success");
		elem.removeClass("btn-default");
		all_sounds[sound][num] = true;
	}
}

function render_steps () {
	for (sound in all_sounds){
		for (var i = 0; i < steps; i++){
			var html_string = '<button class="beat-grid btn btn-default"></button>';
			el = $(html_string);
			var num = i;
			var s = sound;
			el.click(function(){
				select_note (num, s, $(this));
			})
			var row_name = "#"+sound+"-notes";
			$(row_name).append(el);
		}
	}
}