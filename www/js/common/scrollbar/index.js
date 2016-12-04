'use strict';

var angular = require('angular');
var ScrollbarDirective = require('./scrollbar.directive');

var sbModule = angular.module('scrollbar', []);
sbModule.directive('scrollbar', ScrollbarDirective);

module.exports = sbModule;
