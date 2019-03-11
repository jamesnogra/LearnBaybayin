$(document).ready(function() {

	addLoader();
	$.get("http://learnbaybayinbackend.iamcebu.com/index.php/score/get-score", {login_token:localStorage.getItem("login_token")}, function(result) {
		for (var x=0; x<result.length; x++) {
			if (result[x].score>5) {
				$('#item-'+result[x].character).html('<img src="img/characters/'+result[x].character+'.3.bmp" width="90%" />');
			}
		}
		removeLoader();
	});

});