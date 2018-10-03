closeSidebar();

function openSidebar() {
	$("#my-sidebar").css("display", "block");
}
function closeSidebar() {
	$("#my-sidebar").css("display", "none");
}

$(document).click(function (event) {

	$('body,html').click(function (e) {
		var container = $("#my-sidebar");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			closeSidebar();
		}
	});

	$('#open-sidebar-icon').click(function (evt) {
	    evt.stopPropagation();
	    openSidebar();
	});

});