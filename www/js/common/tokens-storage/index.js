'use strict';

var angular = require('angular');
var tokensStorageFactory = require('./tokens-storage.factory');

var tokensStorage = angular.module('tokensStorage', []);
tokensStorage.factory('tokensStorage', tokensStorageFactory);

module.exports = tokensStorage;
