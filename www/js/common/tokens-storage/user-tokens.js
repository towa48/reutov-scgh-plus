var angular = require('angular');

var defaults = {
  accessToken: null,
  expiresDateUtc: null,
  refreshToken: null
}

var UserTokens = function(options) {
  if (options.$promise) {
    // parse oauth2 response
    var now = new Date();
    var expires = +options['expires_in'];
    options = {
      accessToken: options['access_token'],
      expiresDateUtc: new Date(now.getTime() + 1000*expires),
      refreshToken: options['refresh_token']
    }
  }

  angular.extend(this, defaults, options);
};

module.exports = UserTokens;
