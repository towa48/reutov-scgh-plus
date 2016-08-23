'use strict';

var TokensStorage = require('./tokens-storage');

module.exports = angular.module('app.common', [
  TokensStorage.name
]);
