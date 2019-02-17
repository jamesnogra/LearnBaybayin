function addLoader() {
	$('body').append('<div id="loader-container"><div class="loader"></div></div>');
}

function removeLoader() {
	$('#loader-container').remove();
}

$(document).ready(function() {
	$('head').append(
		'<style>\
		.loader {\
		    border: 16px solid #f3f3f3; /* Light grey */\
		    border-top: 16px solid #ffc107; /* Blue */\
		    border-radius: 50%;\
		    width: 120px;\
		    height: 120px;\
		    animation: spin 2s linear infinite;\
		    margin: 0 auto;\
		}\
		\
		@keyframes spin {\
		    0% { transform: rotate(0deg); }\
		    100% { transform: rotate(360deg); }\
		}\
		\
		#loader-container {\
			width: 100%;\
			height: 100%;\
			position: fixed;\
			top: 0px;\
			left: 0px;\
			background-color: #FFFFFF;\
			opacity: 0.75;\
			z-index: 100;\
			padding-top: 50%;\
		}\
		</style>'
	);
});