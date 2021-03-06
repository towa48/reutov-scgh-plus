'use strict';

var template = require('./home.html');
var controller = require('./home.controller');

var homeComponent = {
  restrict: 'E',
  scope: {},
  template: template,
  controller: ['tokensStorage', controller],
  controllerAs: 'vm',
  bindToController: true
};

module.exports = homeComponent;
