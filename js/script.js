(function() {

  function naiveUriCompare(a, b) {
    a = a.replace(/\/?(?:[#\?].*)?$/, '');
    b = b.replace(/\/?(?:[#\?].*)?$/, '');
    return a === b;
  }

  function highlightUriTarget() {
    $('.uri-target').removeClass('uri-target');
    if ( location.hash )
      $(location.hash.replace(/([^#a-z0-9])/g, '\\$1')).addClass('uri-target');
  }

  $(function() {
    highlightUriTarget();
    
    $(window).bind('hashchange', function(event) {
      highlightUriTarget();
    });
    
    $('.ui-menu-bar a[href]').each(function(i, el) {
      if ( naiveUriCompare(location.href, el.href) )
        $(el).addClass('here').click(function(event) { event.preventDefault() });
    });
    
    $('time.datetime-relative').each(function(i, el) {
      var $time = $(el);
      var options = { };
      
      if ( $time.hasClass('datetime-date-only') )
        options.units = [
          { name: "today", limit: 86400 },
          { name: "yesterday", limit: 172800, past_only: true },
          { name: "tomorrow", limit: 172800, future_only: true },
          { name: "day", limit: 604800, in_seconds: 86400 },
          { name: "week", limit: 2629743, in_seconds: 604800  },
          { name: "month", limit: 31556926, in_seconds: 2629743 },
          { name: "year", limit: Infinity, in_seconds: 31556926 } ]
      
      $time.easydate(options);
    });
  });

})()
