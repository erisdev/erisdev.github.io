$(function() {
	var $projectsMenu = $();
	
	$('a.menu').click(function(event) {
		$(this).parent('li').toggleClass('open');
		return false;
	});
	
	populateGitHubMenu('#github-projects')
});

function populateGitHubMenu(selector)
{
	var $menu = $(selector);
	var user = $menu.data('user');
	
	$.github(user).repositories(function(data) {
		_.each(data.repositories, function(r) {
			if ( r.fork ) return;
			
			$('<li>').append(
				$('<a>')
				.text(r.name)
				.attr('href', r.url)
			).append(
				$('<span>').append($('<small>').text(r.description))
			).appendTo($menu);
		})
	});
}
