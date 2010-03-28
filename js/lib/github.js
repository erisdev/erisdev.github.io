(function() {
  var gh_api_base = {
    github: {
      insecure: 'http://github.com/api/v2/json/@',
      secure: 'https://github.com/api/v2/json/@'
    },
    gist: {
      insecure: 'http://gist.github.com/@.json',
      secure: 'https://gist.github.com/@.json'
    }
  };
  
  var gh_next_callback_number = 0;
  function gh_next_callback_id() {
    return 'gh_callback_' + gh_next_callback_number++;
  }
  
  var GitHub = window.GitHub = function(login, token) {
    this.login = login;
    this.token = token;
  }
  
  GitHub.callbacks = {};
  
  // SINGLETON METHODS
  
  var gh_unauth_instance = null;
  GitHub.unauth = function() {
    if (!gh_unauth_instance) gh_unauth_instance = new this(null, null);
    return gh_unauth_instance;
  }
  
  GitHub.api_uri = function(path, callback_id) {
    return this.unauth().api_uri(path, callback_id);
  };
  
  GitHub.call = function(path, callback) { 
    return this.unauth().call(path, callback);
  };
  
  GitHub.gist = function(id, callback) {
    return this.unauth().gist(id, callback);
  }
  
  // INSTANCE METHODS
  
  GitHub.prototype.api_uri = function(path, callback_id) {
    var login = this.login, token = this.token;
    var authenticated = !!login && !!token
    
    var api, match;
    
    if (match = path.match(/^(gist|github):(.+)$/)) {
      api  = match[1];
      path = match[2];
    }
    else {
      api = 'github';
    }
    
    var uri_base;
    var uri_params = '?callback=' + escape('GitHub.callbacks["' + callback_id + '"]');
    
    if (authenticated) {
      uri_base    = gh_api_base[api].secure;
      uri_params += '&login=' + escape(this.login)
                 +  '&token=' + escape(this.token);
    }
    else {
      uri_base = gh_api_base[api].insecure;
    }
    
    return uri_base.replace('@', escape(path)) + uri_params;
  };
  
  GitHub.prototype.call = function(path, user_callback) {
    var head   = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    
    var callback_id = gh_next_callback_id();
    
    GitHub.callbacks[callback_id] = function(json) {
      user_callback(json);
      delete GitHub.callbacks[callback_id];
      head.removeChild(script);
    };
    
    script.setAttribute('id',   callback_id);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src',  this.api_uri(path, callback_id));
    
    head.appendChild(script);
  }
  
})();
