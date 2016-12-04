'use strict';

var EventBusService = function($rootScope) {
  this.$rootScope = $rootScope;

  this.trigger = function(eventName, state) {
    this.$rootScope.$emit(eventName, state);
  }

  this.on = function(eventName, handler) {
    if (typeof handler !== 'function') {
      return;
    }
    this.$rootScope.$on(eventName, handler);
  }
}

module.exports = EventBusService;
