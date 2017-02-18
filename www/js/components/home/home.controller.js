'use strict';

var i18n = require('../../i18n');

var HomeController = function() {
  this.name = 'Home';
  this.i18n = i18n;
}
HomeController.prototype.log = function(obj) {
  console.log(obj);
}

module.exports = HomeController;
