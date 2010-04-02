$(function() {
	$('#sections').tabs({
		cache: true,
		spinner: $('#spinner-tmpl').text()
	});
	
	$('p > a[href^=http://gist.github.com/]:only-child').livequery(function() {
		$(this).each(function(i, link) {
			var match = $(link).attr('href').match(/^http:\/\/gist\.github\.com\/(\d+)$/i);
			if (!match) return;
			GitHub.call('gist:' + match[1], function(data) {
				$(link).parent().replaceWith(data.div);
			});
		});
	});
	
	GitHub.call('user/show/' + CONFIG.github.user, function(data) {
		$('#profile-tmpl').render(data.user).appendTo($('#overview .profile').empty());
	});
	
	GitHub.call('repos/show/' + CONFIG.github.user, function(data) {
		$('#repository-tmpl').render(data.repositories).appendTo($('#overview .repositories').empty());
	});
	
	$.jTwitter(CONFIG.twitter.user, CONFIG.twitter.limit, function(tweets) {
		$('#tweet-tmpl').render(tweets).appendTo($('#overview .twitter').empty());
	})
	
});

function autolink(text) {
	return text.replace(
		/https?:\/\/(?:\w+:{0,1}\w*@)?\S+(?::[0-9]+)?(\/|\/[\w#!:.?+=&%@!\-\/])?/ig,
		'<a href="$&">$&</a>'
	);
}
