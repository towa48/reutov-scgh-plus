'use strict';

var i18n = require('../../i18n');
var UserTokens = require('../../common/tokens-storage/user-tokens');

var SignInController = function($state, tokensStorage, tokensProvider) {
  this.name = 'SignIn';
  this.i18n = i18n;
  this.login = null;
  this.password = null;
  this.signin = function() {
    tokensProvider
      .get({
        username: this.login,
        password: this.password
      })
      .then(function(response) {
        tokensStorage.set(new UserTokens(response));
        $state.transitionTo('home');
      })
      .catch(function(error) {
        console.log(error.status + ' ' + error.statusText, error.data);
      });
  }
}

module.exports = SignInController;
