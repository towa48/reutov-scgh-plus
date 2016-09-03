'use strict';

var SPLASHSCREEN_DELAY = 3000;

var window = require('global/window');
var document = require('global/document');
var angular = require('angular');
var i18n = require('./i18n');

var app = require('./app');

var splashExpired = false;
var splashTimerId = setTimeout(function() {
  splashExpired = true;
  hideSplash();
}, SPLASHSCREEN_DELAY);

// bind to deviceready event
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  window.navigator.globalization.getPreferredLanguage(startup,startup);
}

function hideSplash() {
  window.navigator.splashscreen.hide();
}

function startup(language) {
  if (language) {
    i18n.setLocale(language.value);
  } else {
    i18n.setLocale("en");
  }

  angular.bootstrap(document, [app.name]);

  if (!splashExpired) {
    return;
  }

  clearTimeout(splashTimerId);
  hideSplash();
}
