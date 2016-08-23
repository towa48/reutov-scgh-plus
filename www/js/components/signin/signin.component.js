'use strict';

var template = require('./signin.html');
var controller = require('./signin.controller');

var signinComponent = {
  restrict: 'E',
  scope: {},
  template: template,
  controller: controller,
  controllerAs: 'vm',
  bindToController: true
};

module.exports = signinComponent;
