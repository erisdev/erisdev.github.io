(function($) {
	var email_chars = {
		find: function(full_match, name) { return email_chars[name] },
		at: '@', dot: '.'
	};
	
	$.fn.emailize = function() {
		var email = this.text().replace(/\s+(at|dot)\s+/g, email_chars.find);
		this.replaceWith( $('<a>').attr('href', 'mailto:' + email).text(email) );
		return this;
	};
})(jQuery);
