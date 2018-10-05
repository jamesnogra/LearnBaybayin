var all_vowels = ['a', 'e_i', 'o_u'];
var at_index = 0;
var start_time, end_time;
var total_score = 0;
var score_for_this_level = 0;
var time_difference = 0;
var temp_message = '';

$(document).ready(function() {

	showCharacter();

	$('#back-button').click(function() {
		if (confirm("Are you sure you want to go back to the main menu?")) {
			window.location = "index.html";
		}
	});

	$('#next-button').click(function() {
		submitAndUpload(at_index);
		at_index++;
		countTime();
		addLoader();
	});

	$('#final-score-ok-button').click(function() {
		$("#final-score").css("display", "none");
		window.location = "index.html";
	});

	/*start For the drawing*/
	var $window = $(window);
	var temp_width = $window.width();
	var temp_height = $window.height();
	var temp_dim = (temp_width<temp_height) ? temp_width : temp_height;
	temp_dim = temp_dim - 50;
	$("#sheet").attr("width", temp_dim);
	$("#sheet").attr("height", temp_dim);
	context = document.getElementById('sheet').getContext("2d");
	canvas = document.getElementById('sheet');
	context = canvas.getContext("2d");
	context.strokeStyle = "#000000";
	context.lineJoin = "round";
	context.lineWidth = temp_dim/14;
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	canvas.addEventListener('mousedown', mouseWins);
	canvas.addEventListener('touchstart', touchWins);
	/*end For the drawing*/

});

function showCharacter() {
	var temp_html = '';
	start_time = new Date();
	for (var x=1; x<=3; x++) {
		temp_html += '<img src="img/characters/'+all_vowels[at_index]+'.'+x+'.bmp" class="sample-character" />';
	}
	$('#three-sample-characters-container').html(temp_html);
	$('.character-represent').html(all_vowels[at_index].replace("_", "/").toUpperCase());
}

function countTime() {
	end_time = new Date();
	time_difference = end_time - start_time; //in ms
	score_for_this_level = 0;
	// strip the ms
	time_difference /= 1000;
	// get seconds 
	var seconds_elapsed = Math.round(time_difference);
}

function saveScoreToDB() {
	var score_data = {
		login_token: 	localStorage.getItem("login_token"),
		score:  		score_for_this_level,
		time:  			time_difference,
		stage:  		'STAGE 2',
		level:  		'LEVEL ' + at_index,
		character:  	'',
		details:  		'No character info because this is stage 1.',
	};
	$.post("http://learnbaybayinbackend.iamcebu.com/index.php/score/add-score", score_data, function(result) {
		//none
	});
}

function submitAndUpload(current_index) {
	$('#loader-container').show();
	var res = [];
	//grab the context from your destination canvas
	var dest_context = document.getElementById('sheet-small').getContext("2d");
	var source_canvas = document.getElementById('sheet');
	dest_context.drawImage(source_canvas, 0, 0,28,28);
	// Generate the image data
    var pic = document.getElementById("sheet-small").toDataURL("image/png");
    pic = pic.replace(/^data:image\/(png|jpg);base64,/, "");
    // Sending the image data to Server
    $.post("http://45.62.253.243:8080/classify-image", {'curent_character':all_vowels[at_index], 'imageData':pic}, function(result) {
    	removeLoader();
    	for (var x=0; x<result.all_chars.length; x++) {
    		if (all_vowels[current_index].replace("_", "/").toUpperCase() == result.all_chars[x]) {
    			score_for_this_level = Math.round(result.result_float[x]*10);
    			total_score += score_for_this_level;
				$('#score-card').addClass('rotate-scale-up');
				setTimeout(function(){
			        $('#score-card').removeClass('rotate-scale-up');
			    }, 700);
				$('.score-value').html(total_score);
    		}
    	}
		saveScoreToDB();
		if (at_index<all_vowels.length) {
			showCharacter();
		} else {
			at_index--;
			temp_message = 'You can now proceed to the next stage.';
			if (total_score<((all_vowels.length*10)/2)) {
				temp_message = 'You failed in this stage. You probably didn\'t read each card.';
			}
			$('#final-message').html(temp_message);
			$("#final-score").css("display", "block");
		}
	});
	clearCanvas();
}