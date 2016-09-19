'use strict';
var UserTokens = require('./user-tokens');
var window = require('global/window');

var TokensStorageFactory = function() {
  return {
    get: function() {
      var value = window.localStorage.getItem('userTokens');
      if (value && value !== '') {
        return new UserTokens(window.JSON.parse(value));
      }

      return null;
    },
    set: function(tokens) {
      var value = window.JSON.stringify(tokens);
      window.localStorage.setItem('userTokens', value);
    }
  }
}

module.exports = TokensStorageFactory;
