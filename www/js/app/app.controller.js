'use strict';

var AppController = function($scope, eventBus) {
  this.loaded = false;

  var self = this;
  eventBus.on('app-loaded', function() {
    self.loaded = true;
    $scope.$digest();
  });
}

module.exports = AppController;
