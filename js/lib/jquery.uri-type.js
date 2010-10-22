(function($) {
	
	var ut = $.uriType = {
		ABSOLUTE : 0x01,
		EXTERNAL : 0x03,
		ANCHOR   : 0x04,
		
		flags: function(uri) {
			var flags = 0;
			
			if      (uri.indexOf('://') > -1) flags |= ut.EXTERNAL;
			else if (uri[0] == '/'          ) flags |= ut.ABSOLUTE;
			
			if (uri.indexOf('#') > -1) flags |= ut.ANCHOR;
			
			return flags;
		},
		
		isRelative: function(uri) { return  !(ut.flags(uri) & ut.ABSOLUTE) },
		isAbsolute: function(uri) { return !!(ut.flags(uri) & ut.ABSOLUTE) },
		isInternal: function(uri) { return  !(ut.flags(uri) & ut.EXTERNAL) },
		isExternal: function(uri) { return !!(ut.flags(uri) & ut.EXTERNAL) },
		isAnchor:   function(uri) { return !!(ut.flags(uri) & ut.ANCHOR)   },
		
		anchor: function(uri) {
			var i = uri.indexOf('#');
			if (i > -1)
				return uri.slice(i);
			else
				return null;
		},
		
		protocol: function(uri) {
			var i = uri.indexOf('://');
			if (i > -1) {
				uri.slice(0, i)
			}
			else
				return ut.protocol(window.location.href);
		}
		
	};
	
	function gen_uri_selector(test) {
		return function(el) {
			var uri = el.getAttribute('href') || el.getAttribute('src')
			return test(uri);
		}
	}
	
	$.extend($.expr[':'], {
		relative : gen_uri_selector(ut.isRelative),
		absolute : gen_uri_selector(ut.isAbsolute),
		internal : gen_uri_selector(ut.isInternal),
		external : gen_uri_selector(ut.isExternal),
		anchor   : gen_uri_selector(ut.isAnchor)
	});
	
})(jQuery);
