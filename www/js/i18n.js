var angular = require('angular');
var ru = require('../../i18n/ru.json'); // bundle it with webpack
var en = require('../../i18n/en.json');

function isLocale(value, locale) {
  return value === locale || value.indexOf(locale + '-', 0) === 0;
}

var i18n = en;
i18n.setLocale = function(locale) {
  if (isLocale('ru')) {
    angular.extend(this, ru);
    return;
  }
  // en by default
}

module.exports = i18n;
