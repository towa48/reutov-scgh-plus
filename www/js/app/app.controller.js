'use strict';

var AppController = function($scope, eventBus) {
  this.loaded = false;

  var self = this;
  eventBus.on('app-loaded', function() {
    console.log('loaded');
    self.loaded = true;
    $scope.$digest();
  });
}

module.exports = AppController;
