var kick = [];
var snare = [];
var hihat = [];
var clap = [];
var tempo = 120;


$(function(){
	if(!buzz.isSupported()){
		alert("Use an HTML5 compliant browser!");
	} else {
		init();
	}

})

function init () {
	for (var i = 0; i < 16; i++){
		kick[i] = false;
		snare[i] = false;
		clap[i] = false;
		hihat[i] = false;
	}
}