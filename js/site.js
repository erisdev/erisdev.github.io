(function() {
// begin closure

var TEMPLATES = {};

$(function() {
	$('.template').each(function(i, el) {
		var $el = $(el), name = $el.attr('data-name'), text = $el.text();
		TEMPLATES[name] = _.template(text);
	});
	
	$('#sections').tabs({
		cache: true,
		spinner: 'Loading...'
	});
	
	$('gist').livequery(function() {
		$(this).each(function(i, link) {
			var $link = $(link), id = $link.attr('idref');
			if (!id) return;
			GitHub.call('gist:' + id, function(data) {
				$link.parent().replaceWith(data.div);
			});
		});
	});
	
	$('a.profile[data-user]').livequery(function() {
		var $link = $(this), user = $link.attr('data-user');
		$link.wrap('<h3>').removeClass('profile');
		GitHub.call('user/show/' + user, function(data) {
			$link.parent().after(TEMPLATES.profile({ user:data.user }));
		});
	}); // a.profile
	
	$('a.repositories[data-user]').livequery(function() {
		var $link = $(this), user = $link.attr('data-user');
		$link.wrap('<h3>').removeClass('repositories');
		GitHub.call('repos/show/' + user, function(data) {
			$link.parent().after(TEMPLATES.repositories({ repositories:data.repositories }));
		});
	}); // a.repositories
	
	$('a.twitter[data-user]').livequery(function() {
		var $link = $(this), user = $link.attr('data-user');
		$link.wrap('<h3>').removeClass('twitter');
		$.jTwitter(user, function(data) {
			_(data).each(function(tweet) { tweet.html = autolink(tweet.text) })
			$link.parent().after(TEMPLATES.twitter({ tweets:data }));
		});
	}); // a.twitter
	
});

function autolink(text) {
	return text.replace(
		/https?:\/\/(?:\w+:{0,1}\w*@)?\S+(?::[0-9]+)?(\/|\/[\w#!:.?+=&%@!\-\/])?/ig,
		'<a href="$&">$&</a>'
	);
}

// end closure
})();
