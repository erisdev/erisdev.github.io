(function() {

  function naiveUriCompare(a, b) {
    a = a.replace(/\/?(?:[#\?].*)?$/, '');
    b = b.replace(/\/?(?:[#\?].*)?$/, '');
    return a === b;
  }

  $(function() {
    $('.ui-menu-bar a[href]').each(function(i, el) {
      if ( naiveUriCompare(location.href, el.href) )
        $(el).addClass('here').click(function(event) { event.preventDefault() });
    });
    
    $('time').easydate();
  });

})()
