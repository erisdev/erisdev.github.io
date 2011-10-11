(function() {

  function naiveUriCompare(a, b) {
    a = a.replace(/\/?(?:[#\?].*)?$/, '');
    b = b.replace(/\/?(?:[#\?].*)?$/, '');
    return a === b;
  }

  $(function() {
    $('a[href]').each(function(i, el) {
      if ( naiveUriCompare(location.href, el.href) )
        $(el).addClass('here');
    });
  });

})()
