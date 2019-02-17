var total_stages = 15;

var stage_score = [];
for (var x=0; x<total_stages; x++) {
	stage_score[x] = 0;
}

$(document).ready(function() {

	addLoader();
	$.get("http://learnbaybayinbackend.iamcebu.com/index.php/score/get-score", {login_token:localStorage.getItem("login_token")}, function(result) {
		removeLoader();
		for (var x=0; x<result.length; x++) {
			for (var y=1; y<total_stages; y++) { //we disregard score for stage 0
				if (result[x]['stage'] == 'STAGE '+y) {
					stage_score[y] += result[x]['score'];
				}
			}
		}
		for (var x=1; x<total_stages; x++) { //we disregard score for stage 0
			$('#stage-'+x+'-score').html(stage_score[x]);
		}
		$.post("http://learnbaybayinbackend.iamcebu.com/index.php/score/save-total-scores", {login_token:localStorage.getItem("login_token"), scores:stage_score}, function(result) {
			//saved
		});
	});

});