var tutorial_list = [
	['Are you ready to start the first stage?', 0],
	['Baybayin is an ancient script used primarily by the Tagalog people.<p><img src="css/baybayinbg.jpg" width="100%" /></p>It continued to be used during the early part of the Spanish colonization of the Philippines until it has been replaced by the Latin alphabet.', 10],
	['This script has three alphabet characters that represent the vowels A, E/I, and O/U.<p><img src="css/baybayin-vowels.bmp" /></p>Baybayin has also fourteen consonants namely B, C/K, D/R, G, H, L, M, N, NG, P, S, T, W, and Y.<p><img src="css/baybayin-consonants.bmp" width="100%" /></p>You will learn all of these characters in the next stages.', 10],
	['The term baybayin literally means "to spell, write, and syllabize" in Tagalog.', 5],
	['The characters for E & I are the same. So is for the characters of O & U, D & R, and C & K.<p><img src="css/same-meaning.bmp" width="100%" /></p>The word LALAKE & LALAKI and DITO & RITO are spelled using the same Baybayin characters. There\'s only few words that are spelled using the same Baybayin characters but have different meanings.', 10],
	['<p><img src="css/all-four-pa.bmp" width="100%" /></p>There are four ways a consonant Baybayin character can be represented. Adding a dot at the top of the consonant Baybayin character will make it pronounceable with E or I instead of A. Adding a dot at the bottom will make it pronounceable with O or U. While adding a cross sign at the bottom will lose its vowel companion sound.', 10],
	['<p><img src="css/common-strokes.bmp" width="100%" /></p>The common strokes that are used in the Baybayin characters are the \'S\', the wave, and the number 3.', 10],
	['<p><img src="css/how-to.gif" width="65%" /></p>For the rest of the stages, this is how you would be writing/drawing your answers.', 5],
];
var at_index = 0;
var start_time, end_time;
var total_score = 0;
var score_for_this_level = 0;
var time_difference = 0;
var temp_message = '';

$(document).ready(function() {

	displayTutorial();

	$('#back-button').click(function() {
		/*if (confirm("Are you sure you want to go back to the main menu?")) {
			window.location = "index.html";
		}*/
		customConfirm("Confirm to exit!", "Are you sure you want to go back to the main menu?", "OK", "No", "index.html")
	});

	$('#next-button').click(function() {
		at_index++;
		countTime();
		saveScoreToDB();
		if (at_index<tutorial_list.length) {
			displayTutorial();
		} else {
			at_index--;
			temp_message = 'You can now proceed to the next stage.';
			if (total_score<((tutorial_list.length*10)/2)) {
				temp_message = 'You failed in this stage. You probably didn\'t read each card.';
			}
			$('#final-message').html(temp_message);
			$("#final-score").css("display", "block");
		}
	});

	$('#final-score-ok-button').click(function() {
		$("#final-score").css("display", "none");
		window.location = "index.html";
	});

	$('#share-button').click(function() {
		if ((total_score+10) > tutorial_list.length*10) {
			total_score = tutorial_list.length*10;
		} else {
			total_score += 10;
		}
		animateScore();
		saveScoreToDB();
		$("#final-score").css("display", "none");
		shareParams();
	});

});

function displayTutorial() {
	start_time = new Date();
	$('#tutorial-number').html((at_index+1) + "/" + (tutorial_list.length));
	$('#list-tutorial').html(tutorial_list[at_index][0]);
}

function countTime() {
	end_time = new Date();
	time_difference = end_time - start_time; //in ms
	score_for_this_level = 0;
	// strip the ms
	time_difference /= 1000;
	// get seconds 
	var seconds_elapsed = Math.round(time_difference);
	if (tutorial_list[at_index-1][1] != 0) {
		if (seconds_elapsed >= tutorial_list[at_index-1][1]) {
			score_for_this_level = 10;
		} else {
			score_for_this_level = Math.round((seconds_elapsed/tutorial_list[at_index-1][1])*10);
		}
	} else {
		score_for_this_level = 10;
	}
	total_score += score_for_this_level;
	animateScore();
}

function animateScore() {
	$('#score-card').addClass('rotate-scale-up');
	setTimeout(function(){
        $('#score-card').removeClass('rotate-scale-up');
    }, 700);
	$('.score-value').html(total_score);
}

function saveScoreToDB() {
	var score_data = {
		login_token: 	localStorage.getItem("login_token"),
		score:  		score_for_this_level,
		time:  			time_difference,
		stage:  		'STAGE 1',
		level:  		'LEVEL ' + at_index,
		character:  	'',
		details:  		'No character info because this is stage 1.',
	};
	$.post("http://learnbaybayinbackend.iamcebu.com/index.php/score/add-score", score_data, function(result) {
		//none
	});
}

//https://play.google.com/store/apps/details?id=com.iamcebu.learnbaybayin
function shareParams() {
	try {
		window.plugins.socialsharing.share('https://play.google.com/store/apps/details?id=com.iamcebu.learnbaybayin', 'Try the Learn Baybayin App!');
		window.location = "index.html";
	}
	catch(err) {
		console.log(err);
		alert("Sharing not supported!");
	}
}