'use strict';

var template = require('./scrollbar.html');

var Modes = {
  vertical: 'vertical',
  horizontal: 'horizontal'
}

var ScrollbarPresenter = function($scope, $el, attrs) {
  $scope.Modes = Modes;
  this.$indicatorEl = $el.children('.scroll-bar-indicator');

  this.$indicatorEl.addClass('in');
  this.$indicatorEl.css({
    'height': '20px',
    'transform-origin': 'center top 0px',
    'transform': 'translate3d(0px, 0px, 0px) scaleY(1);'
  })
}

var ScrollbarDirective = function() {
  return {
    restrict: 'E',
    replace: true,
    template: template,
    scope: {
      mode: '@mode'
    },
    link: ScrollbarPresenter
  };
}

module.exports = ScrollbarDirective;
