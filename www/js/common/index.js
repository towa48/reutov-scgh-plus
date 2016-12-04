'use strict';

var TokensStorage = require('./tokens-storage');
var TokensProvider = require('./tokens-provider');
var EventBus = require('./event-bus');
var Scrollbar = require('./scrollbar');

module.exports = angular.module('app.common', [
  TokensStorage.name,
  TokensProvider.name,
  EventBus.name,
  Scrollbar.name
]);
