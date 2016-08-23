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
      onEnter: function($state) {
          $state.transitionTo('signin'); // todo: add logic with tokens-storage
      }
    });
}])
.component('home', homeComponent);

module.exports = homeModule;
