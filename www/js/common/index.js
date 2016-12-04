'use strict';

var TokensStorage = require('./tokens-storage');
var TokensProvider = require('./tokens-provider');
var EventBus = require('./event-bus');

module.exports = angular.module('app.common', [
  TokensStorage.name,
  TokensProvider.name,
  EventBus.name
]);
