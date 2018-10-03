function customAlert(title, message, button_name) {
	try {
		navigator.notification.alert(
			message,
			null,
			title,
			button_name,
		);
	} catch(err) {
		alert(message);
	}
}