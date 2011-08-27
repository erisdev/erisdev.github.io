$(function() {
	
	$('a.menu').click(function(event) {
		$(this).parent('li').toggleClass('open');
		return false;
	});
	
});
