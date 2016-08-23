'use strict';

var angular = require('angular');

var SignIn = require('./signin');
var Home = require('./home');

module.exports = angular.module('app.components', [
  SignIn.name,
  Home.name
]);
