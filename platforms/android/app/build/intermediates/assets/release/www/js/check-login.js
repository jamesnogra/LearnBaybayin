$(document).ready(function() {

	if (localStorage.getItem("login_token")===null || localStorage.getItem("login_token").length<1) {
		window.location = "signin.html";
	} else {
		//check the token online
		$.post("http://learnbaybayinbackend.iamcebu.com/index.php/user/check-token", {login_token:localStorage.getItem("login_token")}, function(result) {
			if (result.status == 2) {
				customAlert("Login Error", "Please login again!", "OK");
				window.location = "signin.html";
			}
			$('#user-name').html(result.user.name);
		});
	}

});