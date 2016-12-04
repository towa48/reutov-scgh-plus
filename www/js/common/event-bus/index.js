'use strict';

var angular = require('angular');
var EventBusService = require('./event-bus.service');

var ebModule = angular.module('eventBus', []);
ebModule.service('eventBus', ['$rootScope', EventBusService]);

module.exports = ebModule;
