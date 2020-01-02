var at_index = 0;
var start_time, end_time;
var total_score = 0;
var score_for_this_level = 0;
var time_difference = 0;
var temp_message = '';
var current_character;

$(document).ready(function() {

	/*let model;
	(async function () {
		model = await tf.loadModel("http://45.62.253.243/CNNBaybayin/baybayin-v2-0.0001-4convlayers.model.meta");
	})();*/

	showCharacter();

	$('#back-button').click(function() {
		/*if (confirm("Are you sure you want to go back to the main menu?")) {
			window.location = "index.html";
		}*/
		customConfirm("Confirm to exit!", "Are you sure you want to go back to the main menu?", "OK", "No", "index.html")
	});

	$('#next-button').click(function() {
		submitAndUpload(at_index);
		at_index++;
		countTime();
		addLoader();
		if (stage == 10) { //for stage 10, we randomize the sentences
			current_sentence_array = test_baybayin.tokenize(array_of_sentences[at_index]);
		}
	});

	$('#final-score-ok-button').click(function() {
		$("#final-score").css("display", "none");
		window.location = "index.html";
	});

	$('#erase-button').click(function() {
		clearCanvas();
	});

	/*start For the drawing*/
	var $window = $(window);
	var temp_width = $window.width();
	var temp_height = $window.height();
	var temp_dim = (temp_width<temp_height) ? temp_width : temp_height;
	temp_dim = temp_dim - 75;
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
	if (stage != 10) {
		current_character = specific_characters[at_index];
		for (var x=1; x<=3; x++) {
			temp_html += '<img src="img/characters/'+current_character+'.'+x+'.bmp" class="sample-character" />';
		}
		$('#three-sample-characters-container').html(temp_html);
		if (stage>=9) { //hide sample images after level 9
			//$(".sample-character").css("filter", "blur("+window.innerWidth/25+"px)");
			$(".sample-character").attr("src", "img/characters/missing.bmp");
		}
		$('.character-represent').html(current_character.replace("_", "/").toUpperCase());	
	} else { //this is for stage 10
		var temp_index;
		current_character = 'space';
		while (current_character=='space') {
			temp_index = Math.floor(Math.random()*current_sentence_array.length);
			current_character = current_sentence_array[temp_index];
		}
		for (var x=0; x<current_sentence_array.length; x++) {
			if (x != temp_index) {
				temp_html += '<img src="img/characters/'+current_sentence_array[x]+'.3.bmp" class="sample-character-small'+(current_sentence_array[x]=='space'?'-space':'')+'" />';
			} else {
				temp_html += '<img src="img/characters/missing.bmp" class="sample-character-small" />';
			}
		}
		$('#sentence-container').html(temp_html);
	}
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

function saveScoreToDB(current_character) {
	var score_data = {
		login_token: 	localStorage.getItem("login_token"),
		score:  		score_for_this_level,
		time:  			time_difference,
		stage:  		'STAGE '+stage,
		level:  		'LEVEL ' + at_index,
		character:  	current_character,
		details:  		'This score data is from stage '+stage+'.',
	};
	$.post("http://learnbaybayinbackend.iamcebu.com/index.php/score/add-score", score_data, function(result) {
		//none
	});
}

function submitAndUpload(current_index) {
	var res = [];
	//grab the context from your destination canvas
	var dest_context = document.getElementById('sheet-small').getContext("2d");
	var source_canvas = document.getElementById('sheet');
	dest_context.drawImage(source_canvas, 0, 0,28,28);
	// Generate the image data
    var pic = document.getElementById("sheet-small").toDataURL("image/png");
    pic = pic.replace(/^data:image\/(png|jpg);base64,/, "");
    // Sending the image data to Server
    $.post("http://45.62.253.243:8080/classify-image", {'curent_character':current_character, 'imageData':pic}, function(result) {
    	removeLoader();
    	if (result.status == -1) {
    		at_index--;
    		customAlert("Checking Error", "There was an issue trying to communicate with the server. Please try again.", "OK");
    		showCharacter();
    		return;
    	}
    	for (var x=0; x<result.all_chars.length; x++) {
    		if (current_character.replace("_", "/").toUpperCase() == result.all_chars[x]) {
    			score_for_this_level = Math.round(result.result_float[x]*10);
    			total_score += score_for_this_level;
			    $('#large-score-animation').html(score_for_this_level);
			    $('#large-score-animation').addClass('rotate-scale-up-large');
			    if (score_for_this_level<=5) {
			    	$('#large-score-animation').addClass('large-score-red');
			    }
				setTimeout(function(){
			        $('#large-score-animation').removeClass('rotate-scale-up-large');
			        $('#large-score-animation').removeClass('large-score-red');
			        $('#score-card').addClass('rotate-scale-up');
					setTimeout(function(){
				        $('#score-card').removeClass('rotate-scale-up');
				    }, 700);
			    }, 1750);
				$('.score-value').html(total_score);
    		}
    	}
		saveScoreToDB(current_character);
		if (at_index<specific_characters.length) {
			showCharacter();
		} else {
			at_index--;
			temp_message = 'You can now proceed to the next stage.';
			if (total_score<((specific_characters.length*10)/2)) {
				temp_message = 'You failed in this stage. Try again doing this stage.';
			}
			$('#final-message').html(temp_message);
			$("#final-score").css("display", "block");
		}
	});
	$.post("http://45.62.253.243/BaybayinSavedCharacters/upload-image.php", {'curent_character':current_character, 'full_name':'TEST', 'imageData':pic, 'from_users':'TEST'}, function(result) {
		//$( ".result" ).html( data );
	});
	clearCanvas();
}