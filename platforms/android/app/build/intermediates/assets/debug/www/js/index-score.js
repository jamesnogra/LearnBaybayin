var stage_1_score = 0;
var stage_2_score = 0;

$(document).ready(function() {

	$.get("http://learnbaybayinbackend.iamcebu.com/index.php/score/get-score", {login_token:localStorage.getItem("login_token")}, function(result) {
		for (var x=0; x<result.length; x++) {
			if (result[x]['stage'] == 'STAGE 1') {
				stage_1_score += result[x]['score'];
			}
			if (result[x]['stage'] == 'STAGE 2') {
				stage_2_score += result[x]['score'];
			}
		}
		$('#stage-1-score').html(stage_1_score);
		$('#stage-2-score').html(stage_2_score);
	});

});