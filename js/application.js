$(function() {
	var $projectsMenu = $();
	
	$('a.menu').click(function(event) {
		$('a.menu').not(this).parent('li').removeClass('open');
		$(this).parent('li').toggleClass('open');
		return false;
	});
	
	populateGitHubMenu('#github-projects')
	populateTwitterMenu('#twitter')
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

function populateTwitterMenu(selector)
{
	var $menu = $(selector);
	var user = $menu.data('user');
	
	$.getJSON('https://api.twitter.com/1/statuses/user_timeline.json?callback=?', {
		include_entities: true,
		include_rts: false,
		count: 5,
		screen_name: user
	}, function(data) {
		_.each(data, function(tweet, i) {
			// if ( i != 0 )
			// 	$('<li>').addClass('divider').appendTo($menu);
				
			$('<li>').append(
				$('<span>').text(tweet.text)
			).appendTo($menu);
			
			// if ( tweet.entities )
			// 	_.each(tweet.entities.urls, function(link) {
			// 		$('<a>').attr('href', link.url).text(link.display_url).appendTo($menu);
			// 	});
			
		});
	});
}