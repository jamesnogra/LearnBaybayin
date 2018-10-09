var stage_1_score = 0;
var stage_2_score = 0;
var stage_3_score = 0;
var stage_4_score = 0;
var stage_5_score = 0;

$(document).ready(function() {

	addLoader();
	$.get("http://learnbaybayinbackend.iamcebu.com/index.php/score/get-score", {login_token:localStorage.getItem("login_token")}, function(result) {
		removeLoader();
		for (var x=0; x<result.length; x++) {
			if (result[x]['stage'] == 'STAGE 1') {
				stage_1_score += result[x]['score'];
			}
			if (result[x]['stage'] == 'STAGE 2') {
				stage_2_score += result[x]['score'];
			}
			if (result[x]['stage'] == 'STAGE 3') {
				stage_3_score += result[x]['score'];
			}
			if (result[x]['stage'] == 'STAGE 4') {
				stage_4_score += result[x]['score'];
			}
			if (result[x]['stage'] == 'STAGE 5') {
				stage_5_score += result[x]['score'];
			}
		}
		$('#stage-1-score').html(stage_1_score);
		$('#stage-2-score').html(stage_2_score);
		$('#stage-3-score').html(stage_3_score);
		$('#stage-4-score').html(stage_4_score);
		$('#stage-5-score').html(stage_5_score);
	});

});