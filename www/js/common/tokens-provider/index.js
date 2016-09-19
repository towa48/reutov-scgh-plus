'use strict';

var angular = require('angular');
var window = require('global/window');
var params = require('../../config');

var tokensProvider = function($resource) {
  return {
    get: function(signInModel) {
      var promise = $resource('https://auth-dom4me.azurewebsites.net/OAuth/Token', null, {
          signIn: {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + window.btoa(params.clientId + ':' + params.clientSecret),
              'Cache-Control': 'no-store,no-cache',
              'Pragma': 'no-cache',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(data) {
              if (angular.isString(data)) {
                return data;
              }

              var result = [];
              angular.forEach(data, function(val, key) {
                result.push(window.encodeURIComponent(key) + '=' + window.encodeURIComponent(val))
              });
              result.push('grant_type=password');
              return result.join("&");
            }
          }
        }).signIn(signInModel).$promise;

        return promise;
    }
  }
}

var tokensProviderModule = angular.module('tokensProvider', []);
tokensProviderModule.factory('tokensProvider', ['$resource', tokensProvider]);

module.exports = tokensProviderModule;
