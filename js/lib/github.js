(function() {
  var gh_insecure_api_base = 'http://github.com/api/v2/json/';
  var gh_secure_api_base   = 'https://github.com/api/2/json/';
  
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
    if (gh_unauth_instance)
      return gh_unauth_instance;
    else {
      gh_unauth_instance = new this(null, null);
      return gh_unauth_instance;
    }
  }
  
  GitHub.api_uri = function(path, callback_id) {
    return this.unauth().api_uri(path, callback_id);
  };
  
  GitHub.call = function(path, callback) { 
    return this.unauth().call(path, callback);
  };
  
  // INSTANCE METHODS
  
  GitHub.prototype.api_uri = function(path, callback_id) {
    var login = this.login, token = this.token;
    var authenticated = !!login && !!token
    
    var uri_base;
    var uri_params = '?callback=' + escape('GitHub.callbacks["' + callback_id + '"]');
    
    if (authenticated) {
      uri_base    = gh_secure_api_base;
      uri_params += '&login=' + escape(this.login)
                 +  '&token=' + escape(this.token);
    }
    else {
      uri_base = gh_insecure_api_base;
    }
    
    return uri_base + escape(path) + uri_params;
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
    script.setAttribute('src',  GitHub.api_uri(path, callback_id));
    
    head.appendChild(script);
  };
  
})();
