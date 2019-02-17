closeSidebar(1);

function openSidebar(speed) {
	//$("#my-sidebar").css("display", "block");
	$('#my-sidebar').stop().animate({
	    left:'0px'
	}, speed, function() {});
	$('#my-sidebar-filler').show();
}
function closeSidebar(speed) {
	//$("#my-sidebar").css("display", "none");
	$('#my-sidebar').stop().animate({
	    left:'-65%'
	}, speed, function() {});
	$('#my-sidebar-filler').hide();
}

$(document).click(function (event) {

	$('body,html').click(function (e) {
		var container = $("#my-sidebar");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			closeSidebar(100);
		}
	});

	$('#open-sidebar-icon').click(function (evt) {
	    evt.stopPropagation();
	    openSidebar(100);
	});

});