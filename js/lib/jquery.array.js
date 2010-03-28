(function($) {
  
  function select(it, context) {
    var results = [];
    $.each(this, function(i, obj) {
      if (it.call(context, i, obj)) results.push(obj);
    });
    return $.array(results);
  }
  
  function reject(it, context) {
    var results = [];
    $.each(this, function(i, obj) {
      if (!it.call(context, i, obj)) results.push(obj);
    })
    return $.array(results);
  }
  
  function collect(it, context) {
    var results = [];
    $.each(this, function(i, obj) {
      results.push(iterator.call(context, i, obj));
    });
    return $.array(results);
  }
  
  function inject(acc, it, context) {
    $.each(this, function(i, obj) {
      acc = it.call(context, acc, i, obj);
    });
    return $.array(acc);
  }
  
  function send(method, args) {
    $.each(this, function(i, obj) {
      method.apply(obj, args);
    });
    return this;
  }
  
  function partition(it, context) {
    var results = {};
    $.each(this, function(i, obj) {
      var section = it.call(context, i, obj);
      if (results[section])
        results[section].push(obj);
      else
        results[section] = [ obj ];
    });
    console.log(results);
    return results;
  }
  
  var methods = {
    'select'  : select,  'reject' : reject,
    'collect' : collect, 'inject' : inject,
  
    'send'      : send,
    'partition' : partition
  };
  
  $.array = function(arr) {
    return $.extend(arr, methods);
  };
  
})(jQuery);
