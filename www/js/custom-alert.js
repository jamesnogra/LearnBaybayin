function customAlert(title, message, button_name) {
	try {
		var temp_html = '<div id="custom-alert"> \
			<div style="position:fixed;width:100%;height:100%;top:0px;left:0px;z-index:999;background-color:white;opacity:0.75;">&nbsp;</div>\
				<div style="z-index:1000; box-shadow: 0px 0px 25px #000000; border-radius:10px; background-color:rgb(255,230,153); margin:0; width:75%; left: 50%; top:50%; transform: translate(-50%, -50%); position:fixed; padding: 10px;">\
	            <h3><center>'+title+'</center></h3>\
	            <div><center>'+message+'</center></div>\
	            <p><center><button onclick="$(\'#custom-alert\').remove();" class="w3-button w3-black w3-round-large">'+button_name+'</button></center></p>\
        	</div>\
        </div>';
        $('body').append(temp_html);
		/*navigator.notification.alert(
			message,
			null,
			title,
			button_name,
		);*/
	} catch(err) {
		alert(message);
	}
}

function customConfirm(title, message, button_name_ok, button_name_cancel, redirect_page) {
	var temp_html = '<div id="custom-confirm"> \
		<div style="position:fixed;width:100%;height:100%;top:0px;left:0px;z-index:999;background-color:white;opacity:0.75;">&nbsp;</div>\
			<div style="z-index:1000; box-shadow: 0px 0px 25px #000000; border-radius:10px; background-color:rgb(255,230,153); margin:0; width:75%; left: 50%; top:50%; transform: translate(-50%, -50%); position:fixed; padding: 10px;">\
            <h3><center>'+title+'</center></h3>\
            <div><center>'+message+'</center></div>\
            <p><center>\
            	<button onclick="$(\'#custom-confirm\').remove();window.location=\''+redirect_page+'\';" class="w3-button w3-black w3-round-large">'+button_name_ok+'</button>\
            	<button onclick="$(\'#custom-confirm\').remove();" class="w3-button w3-black w3-round-large">'+button_name_cancel+'</button>\
            </center></p>\
    	</div>\
    </div>';
    $('body').append(temp_html);
}