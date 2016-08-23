'use strict';

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var signinComponent = require('./signin.component')

var signinModule = angular.module('signin', [
  uiRouter
])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('signin', {
      url: '/signin',
      template: '<signin></signin>'
    });
}])
.component('signin', signinComponent);

module.exports = signinModule;
