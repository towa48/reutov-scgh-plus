'use strict';

var TokensStorage = require('./tokens-storage');
var TokensProvider = require('./tokens-provider');

module.exports = angular.module('app.common', [
  TokensStorage.name,
  TokensProvider.name
]);
