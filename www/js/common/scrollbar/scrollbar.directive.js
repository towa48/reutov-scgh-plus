'use strict';

var angular = require('angular');
var ResizeObserver = require('resize-observer-polyfill');
var template = require('./scrollbar.html');

var Modes = {
  vertical: 'vertical',
  horizontal: 'horizontal'
}

/*
 * Returns touch/mousemove point
 */
function getTouchPoint(e) {
  return {
    x: e.pageX || e.touches[0].pageX || e.changedTouches[0].pageX,
    y: e.pageY || e.touches[0].pageY || e.changedTouches[0].pageY
  }
}

var ScrollbarPresenter = function($scope, $el, attrs) {
  $scope.Modes = Modes;

  this._init = function() {
    this._eventHandlers = {};
    this._updateRunning = false;
    this._mouseWheelSpeed = 10;
    this.offsetX = 0;
    this.offsetY = 0;
    this.hasHorizontalScroll = false;
    this.hasVerticalScroll = false;
    this.maxScrollX = 0;
    this.maxScrollY = 0;

    this.$scrollEl = $el;
    this.$indicatorEl = $el.children();
    this.$mainEl = $el.parent();
    this.$sectionEl = angular.element(this.$mainEl.children()[0]);

    this._translateZ = angular.isDefined(this.$sectionEl[0].style['perspective']) ? ' translateZ(0)' : '';

    this.$sectionEl.css({
      'transition-timing-function': 'ease',
      'transform-origin': '0px 0px 0px',
      'transform': 'translate(0px, 0px)' + this._translateZ
    })

    this.$indicatorEl.css({
      'transition-timing-function': 'ease',
      'transform-origin': 'center top 0px',
      'transform': 'translate(0px, 0px)' + this._translateZ
    });

    this._initResize();
    this._initWheel();
    this._initTouch();

    $scope.$on('$destroy', this.destroy.bind(this));
  }

  this._initResize = function() {
    this._resizeObserver = new ResizeObserver(this._resize.bind(this));
    this._resizeObserver.observe(this.$sectionEl[0]);

    var self = this;
    this.on('destroy', function() {
      self._resizeObserver.unobserve(self.$sectionEl[0]);
      self._resizeObserver = null;
    });

    this._resize();
  }

  this._initTouch = function() {
    var onTouchStart = this._onTouchStart.bind(this);
    var onTouchMove = this._onTouchMove.bind(this);
    var onTouchEnd = this._onTouchEnd.bind(this);

    this.$mainEl.on('touchstart mousedown', onTouchStart);
    this.$mainEl.on('touchmove mousemove', onTouchMove);
    this.$mainEl.on('touchend touchcancel mouseup mouseleave', onTouchEnd);

    var self = this;
    this.on('destroy', function() {
      self.$mainEl.off('touchstart mousedown', onTouchStart);
      this.$mainEl.off('touchmove mousemove', onTouchMove);
      this.$mainEl.off('touchcancel touchend mouseup mouseleave', onTouchEnd);
    });
  }

  this._onTouchStart = function(e) {
    //e.preventDefault();

    if (this.maxScrollY === 0 && this.maxScrollX === 0)
      return;

    var touchPoint = getTouchPoint(e);

    this.$touchStart = true;
    this.$touchPrevPoint = touchPoint;
  }

  this._onTouchMove = function(e) {
    if (!this.$touchStart)
      return;

    e.preventDefault();
    var touchDeltaX, touchDeltaY, newX, newY, self = this;
    var touchPoint = getTouchPoint(e);

    touchDeltaX = touchPoint.x - this.$touchPrevPoint.x;
    touchDeltaY = touchPoint.y - this.$touchPrevPoint.y;

    newX = this.offsetX + Math.round(this.hasHorizontalScroll ? touchDeltaX : 0);
    newY = this.offsetY + Math.round(this.hasVerticalScroll ? touchDeltaY : 0);

    if (newX > 0) {
      newX = 0;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > 0) {
      newY = 0;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    this.$touchPrevPoint = touchPoint;
    this.scrollTo(newX, newY);
  }

  this._onTouchEnd = function(e) {
    if (!this.$touchStart)
      return;

    //e.preventDefault();
    this.$touchStart = false;
    this.$touchPrevPoint = null;
  }

  this._initWheel = function() {
    var onWheel = this._wheel.bind(this);

    this.$mainEl.on('wheel', onWheel);
    this.$mainEl.on('mousewheel', onWheel)
    this.$mainEl.on('DOMMouseScroll', onWheel)

    var self = this;
    this.on('destroy', function() {
      self.$mainEl.off('wheel', onWheel);
      self.$mainEl.off('mousewheel', onWheel)
      self.$mainEl.off('DOMMouseScroll', onWheel)
    })
  }

  this._wheel = function(e) {
    e && e.preventDefault();

    if (this.maxScrollY === 0 && this.maxScrollX === 0)
      return;

    var wheelDeltaX, wheelDeltaY, newX, newY, self = this;

    if ('deltaX' in e) {
      if (e.deltaMode === 1) {
        wheelDeltaX = -e.deltaX * this._mouseWheelSpeed;
        wheelDeltaY = -e.deltaY * this._mouseWheelSpeed;
      } else {
        wheelDeltaX = -e.deltaX;
        wheelDeltaY = -e.deltaY;
      }
    } else if ('wheelDeltaX' in e) {
      wheelDeltaX = e.wheelDeltaX / 120 * this._mouseWheelSpeed;
      wheelDeltaY = e.wheelDeltaY / 120 * this._mouseWheelSpeed;
    } else if ('wheelDelta' in e) {
      wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this._mouseWheelSpeed;
    } else if ('detail' in e) {
      wheelDeltaX = wheelDeltaY = -e.detail / 3 * this._mouseWheelSpeed;
    } else {
      return;
    }

    newX = this.offsetX + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
    newY = this.offsetY + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

    if (newX > 0) {
      newX = 0;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > 0) {
      newY = 0;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    this.scrollTo(newX, newY);
  }

  this._updatePosition = function() {
    var self = this;
    if (this._updateRunning)
      return;
    this._updateRunning = true;
    requestAnimationFrame(function() {
      self._updateRunning = false;
      self.$sectionEl[0].style['transform'] = 'translate(0px, ' + self.offsetY + 'px)' + self._translateZ;

      var indicatorOffset = Math.floor(self.$scrollEl[0].offsetHeight * self.offsetY / self.$sectionEl[0].offsetHeight);
      self.$indicatorEl[0].style['transform'] = 'translate(0px, ' + (-indicatorOffset) + 'px)' + self._translateZ;
    });
  }

  this._resize = function() {
    var mainHeight = this.$mainEl[0].offsetHeight,
        sectionHeight = this.$sectionEl[0].offsetHeight;

    if (sectionHeight < mainHeight || mainHeight === 0 || sectionHeight === 0) {
      this.$indicatorEl.removeClass('in');
      this.hasVerticalScroll = false;
      this.maxScrollY = 0;
      return;
    }

    if (!this.hasVerticalScroll) {
      this.hasVerticalScroll = true;
    }

    this.maxScrollY = mainHeight - sectionHeight;
    // todo: this.maxScrollX,

    var indicatorHeight = Math.floor(mainHeight * this.$scrollEl[0].offsetHeight / sectionHeight);
    this.$indicatorEl.css({
      'height': indicatorHeight + 'px'
    });

    this.$indicatorEl.addClass('in');
  }

  this.scrollTo = function(x, y, time) {
    this.offsetX = x;
    this.offsetY = y;
    this._updatePosition();
  }

  this.trigger = function(event) {
    var handlers = this._eventHandlers[event];
    if (!handlers || handlers.length === 0)
      return;
    for(var i=0;i<handlers.length;i++) {
      handlers[i].call(arguments.slice(1));
    }
  }

  this.on = function(event, handler) {
    if (!this._eventHandlers[event]) {
      this._eventHandlers[event] = [];
    }
    this._eventHandlers[event].push(handler);
  }

  this.destroy = function() {
    this.trigger('destroy');
    this.$indicatorEl =  null;
    this.$mainEl = null;
    this.$sectionEl = null;
    this._eventHandlers = null;
  }

  this._init();
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
