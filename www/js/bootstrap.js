'use strict';

var angular = require('angular');
var document = require('global/document');

var app = require('./app');

angular.element(document).ready(function() {
  angular.bootstrap(document, [app.name]);
});
