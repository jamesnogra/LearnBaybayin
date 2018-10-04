$(document).ready(function() {

	$('#submit-survey-button').click(function() {
		var selected_subjects = "";
		$('#subjects-checkboxes input:checked').each(function() {
			selected_subjects += $(this).attr('value') + ",";
		});
		selected_subjects = selected_subjects.substring(0, selected_subjects.length - 1); // "12345.0"
		addLoader();
		$.post("http://learnbaybayinbackend.iamcebu.com/index.php/user/update-favorite-subjects", {login_token:localStorage.getItem("login_token"), favorite_subjects: selected_subjects}, function(result) {
			window.location = "index.html";
		});
	});

});