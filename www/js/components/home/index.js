'use strict';

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var homeComponent = require('./home.component')

var homeModule = angular.module('home', [
  uiRouter
])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>',
      onEnter: ['$state', 'tokensStorage', function($state, tokensStorage) {
        var tokens = tokensStorage.get();
        if (tokens === null || new Date(tokens.expiresDateUtc) <= new Date()) {
          $state.transitionTo('signin');
        }
      }]
    });
}])
.component('home', homeComponent);

module.exports = homeModule;
