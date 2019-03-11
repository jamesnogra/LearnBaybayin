$(document).ready(function() {

	$('#login-button').click(function() {
		var email = $('#email').val();
		var password = $('#password').val();
		if (email.length>0 && password.length>0) {
			addLoader();
			$.post("http://learnbaybayinbackend.iamcebu.com/index.php/user/login", {email:email, password:password}).done(function(result) {
				if (result.status == 1) {
					localStorage.setItem("login_token", result.user.login_token);
					localStorage.setItem("name", result.user.name);
					localStorage.setItem("email", result.user.email);
					localStorage.setItem("id", result.user.id);
					window.location = "index.html";
				} else {
					removeLoader();
					customAlert("Login Error", "The email or password you entered does not match.", "OK");
				}
			}).fail(function() {
				removeLoader();
				customAlert("Server Did Not Respond", "The server did not respond. Please report to nogra@outlook.com.", "OK");
			});
		}
	});

});