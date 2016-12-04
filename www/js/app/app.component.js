'use strict';

var template = require('./app.html');
var controller = require('./app.controller');

var appComponent = function() {
  return {
    template: template,
    restrict: 'E',
    controller: ['$scope', 'eventBus', controller],
    controllerAs: 'vm',
    bindToController: true
  }
}

module.exports = appComponent;
