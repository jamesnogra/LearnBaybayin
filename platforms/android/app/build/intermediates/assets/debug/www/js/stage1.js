var tutorial_list = [
	['Are you ready to start the first stage?', 0],
	['Baybáyin is an ancient script used primarily by the Tagalog people.<p><img src="css/baybayinbg.jpg" width="100%" /></p>It continued to be used during the early part of the Spanish colonization of the Philippines until it has been replaced by the Latin alphabet.', 10],
	['This script has three alphabet characters that represent the vowels A, E/I, and O/U.<p><img src="css/baybayin-vowels.bmp" /></p>Baybáyin has also 14 consonants namely B, C/K, D/R, G, H, L, M, N, NG, P, S, T, W, and Y.<p><img src="css/baybayin-consonants.bmp" width="100%" /></p>You will learn all of these characters in the next stages.', 10],
	['The characters for E & I are the same. So is for the characters of O & U, C & K, and D & R.<p><img src="css/same-meaning.bmp" width="100%" /></p>The word LALAKE and LALAKI are spelled using the same Baybáyin characters. There\'s only few words that are spelled using the same Baybáyin characters but have different meanings.', 10],
	['<p><img src="css/all-four-pa.bmp" width="100%" /></p>There are four ways a consonant Baybáyin character can be represented. Adding a dot at the top of the consonant Baybáyin character will make make it pronounceable with E or I instead of A. Adding a dot at the bottom will make it pronounceable with O or U. While adding a cross sign at the bottom will lose its vowel companion sound.', 10],
	['<p><img src="css/common-strokes.bmp" width="100%" /></p>The common strokes that are used in the Baybáyin characters are the \'S\' and wave strokes.', 10],
];
var at_index = 0;
var start_time, end_time;
var total_score = 0;

$(document).ready(function() {

	displayTutorial();

	$('#back-button').click(function() {
		if (at_index==0) {
			window.location = "index.html";
		}
		at_index--;
		displayTutorial();
	});

	$('#next-button').click(function() {
		at_index++;
		if (at_index<tutorial_list.length) {
			countTime();
			displayTutorial();
		} else {
			at_index--;
			countTime();
			alert("COMPLETE");
		}
	});

});

function displayTutorial() {
	start_time = new Date();
	$('#tutorial-number').html((at_index+1) + "/" + (tutorial_list.length));
	$('#list-tutorial').html(tutorial_list[at_index][0]);
}

function countTime() {
	end_time = new Date();
	var timeDiff = end_time - start_time; //in ms
	// strip the ms
	timeDiff /= 1000;
	// get seconds 
	var seconds_elapsed = Math.round(timeDiff);
	if (tutorial_list[at_index-1][1] != 0) {
		if (seconds_elapsed >= tutorial_list[at_index-1][1]) {
			total_score += 10;
		} else {
			total_score += Math.round((seconds_elapsed/tutorial_list[at_index-1][1])*10);
		}
	} else {
		total_score += 10;
	}
	$('#score-card').addClass('rotate-scale-up');
	setTimeout(function(){
        $('#score-card').removeClass('rotate-scale-up');
    }, 700);
	$('#score-value').html(total_score);
}