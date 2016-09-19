'use strict';

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var ngResource = require('angular-resource');
var appComponent = require('./app.component');
var common = require('../common');
var components = require('../components');

var appModule = angular.module('app', [
  uiRouter,
  ngResource,
  common.name,
  components.name
])
.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(false);
}])
.directive('app', appComponent);

module.exports = appModule;
