(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/index.coffee":[function(require,module,exports){
var DEFAULTS, ScrollFit, _, _raf;

_raf = require('requestanimationframe');

_ = {};

_.defaults = require('amp-defaults');

DEFAULTS = {
  step: 0.25,
  onResize: true,
  maxFontSize: 100,
  minFontSize: 1
};

ScrollFit = (function() {
  function ScrollFit(el, options) {
    var style;
    if (options == null) {
      options = {};
    }
    if (!el) {
      return false;
    }
    this.options = _.defaults(options, DEFAULTS);
    this.el = el;
    style = window.getComputedStyle(this.el);
    this.fontSize = parseInt(style.fontSize);
    if (options.maxFontSize === 'initial') {
      this.maxFontSize = this.fontSize;
    } else {
      this.maxFontSize = options.maxFontSize;
    }
    if (options.minFontSize === 'initial') {
      this.minFontSize = this.fontSize;
    } else {
      this.minFontSize = options.minFontSize;
    }
    this.candidate = this.maxFontSize;
    if (this.inBounds()) {
      this.grow();
    } else {
      this.shrink();
    }
    if (this.options.onResize) {
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  ScrollFit.prototype.onResize = function() {
    if (!this.ticking) {
      this.ticking = true;
      this.maxFontSize = void 0;
      if (this.inBounds()) {
        return window.requestAnimationFrame(this.grow.bind(this));
      } else {
        return window.requestAnimationFrame(this.shrink.bind(this));
      }
    }
  };

  ScrollFit.prototype.inBounds = function() {
    return this.el.clientHeight + (this.fontSize / 8) >= this.el.scrollHeight && this.el.clientWidth + (this.fontSize / 8) >= this.el.scrollWidth;
  };

  ScrollFit.prototype.grow = function() {
    this.fontSize += this.options.step;
    if (this.fontSize >= this.candidate || this.fontSize >= this.maxFontSize) {
      return this.ticking = false;
    }
    this.el.style.fontSize = this.fontSize + 'px';
    if (this.inBounds()) {
      return this.grow();
    } else {
      this.candidate = this.fontSize;
      return this.shrink();
    }
  };

  ScrollFit.prototype.shrink = function() {
    this.fontSize -= this.options.step;
    if (this.fontSize <= this.minFontSize) {
      return this.ticking = false;
    }
    this.el.style.fontSize = this.fontSize + 'px';
    if (this.inBounds()) {
      return this.grow();
    } else {
      return this.shrink();
    }
  };

  return ScrollFit;

})();

module.exports = window.ScrollFit = ScrollFit;



},{"amp-defaults":"/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/defaults.js","requestanimationframe":"/Users/simon/Development/scrollfit.js/node_modules/requestanimationframe/app/requestAnimationFrame.js"}],"/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/defaults.js":[function(require,module,exports){
var isObject = require('amp-is-object');


module.exports = function defaults(obj) {
    if (!isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
        var source = arguments[i];
        for (var prop in source) {
            if (obj[prop] === void 0) obj[prop] = source[prop];
        }
    }
    return obj;
};

},{"amp-is-object":"/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/node_modules/amp-is-object/is-object.js"}],"/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/node_modules/amp-is-object/is-object.js":[function(require,module,exports){
module.exports = function isObject(obj) {
    var type = typeof obj;
    return !!obj && (type === 'function' || type === 'object');
};

},{}],"/Users/simon/Development/scrollfit.js/node_modules/requestanimationframe/app/requestAnimationFrame.js":[function(require,module,exports){
/**
 * requestAnimationFrame version: "0.0.17" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/requestAnimationFrame for details
 *
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 *
 */


( function( global ) {


    ( function() {


        if ( global.requestAnimationFrame ) {

            return;

        }

        if ( global.webkitRequestAnimationFrame ) { // Chrome <= 23, Safari <= 6.1, Blackberry 10

            global.requestAnimationFrame = global[ 'webkitRequestAnimationFrame' ];
            global.cancelAnimationFrame = global[ 'webkitCancelAnimationFrame' ] || global[ 'webkitCancelRequestAnimationFrame' ];

        }

        // IE <= 9, Android <= 4.3, very old/rare browsers

        var lastTime = 0;

        global.requestAnimationFrame = function( callback ) {

            var currTime = new Date().getTime();

            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );

            var id = global.setTimeout( function() {

                callback( currTime + timeToCall );

            }, timeToCall );

            lastTime = currTime + timeToCall;

            return id; // return the id for cancellation capabilities

        };

        global.cancelAnimationFrame = function( id ) {

            clearTimeout( id );

        };

    } )();

    if ( typeof define === 'function' ) {

        define( function() {

            return global.requestAnimationFrame;

        } );

    }

} )( window );
},{}]},{},["./src/index.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2ltb24vRGV2ZWxvcG1lbnQvc2Nyb2xsZml0LmpzL3NyYy9pbmRleC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYW1wLWRlZmF1bHRzL2RlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2FtcC1kZWZhdWx0cy9ub2RlX21vZHVsZXMvYW1wLWlzLW9iamVjdC9pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvcmVxdWVzdGFuaW1hdGlvbmZyYW1lL2FwcC9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLDRCQUFBOztBQUFBLElBQUEsR0FBYSxPQUFBLENBQVEsdUJBQVIsQ0FBYixDQUFBOztBQUFBLENBRUEsR0FBYSxFQUZiLENBQUE7O0FBQUEsQ0FHQyxDQUFDLFFBQUYsR0FBYSxPQUFBLENBQVEsY0FBUixDQUhiLENBQUE7O0FBQUEsUUFNQSxHQUVJO0FBQUEsRUFBQSxJQUFBLEVBQU0sSUFBTjtBQUFBLEVBR0EsUUFBQSxFQUFVLElBSFY7QUFBQSxFQU9BLFdBQUEsRUFBYSxHQVBiO0FBQUEsRUFXQSxXQUFBLEVBQWEsQ0FYYjtDQVJKLENBQUE7O0FBQUE7QUF1QmlCLEVBQUEsbUJBQUMsRUFBRCxFQUFLLE9BQUwsR0FBQTtBQUNULFFBQUEsS0FBQTs7TUFEYyxVQUFVO0tBQ3hCO0FBQUEsSUFBQSxJQUFHLENBQUEsRUFBSDtBQUFlLGFBQU8sS0FBUCxDQUFmO0tBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBQyxDQUFDLFFBQUYsQ0FBWSxPQUFaLEVBQXFCLFFBQXJCLENBRlgsQ0FBQTtBQUFBLElBSUEsSUFBQyxDQUFBLEVBQUQsR0FBTSxFQUpOLENBQUE7QUFBQSxJQU1BLEtBQUEsR0FBUSxNQUFNLENBQUMsZ0JBQVAsQ0FBeUIsSUFBQyxD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiX3JhZiAgICAgICA9IHJlcXVpcmUgJ3JlcXVlc3RhbmltYXRpb25mcmFtZSdcblxuXyAgICAgICAgICA9IHt9XG5fLmRlZmF1bHRzID0gcmVxdWlyZSAnYW1wLWRlZmF1bHRzJ1xuXG5cbkRFRkFVTFRTID1cbiAgICAjIGFtb3VudCBvZiBpbmNyZWFzaW5nIG9yIGRlY3JlYXNpbmcgdGhlIGZvbnRzaXplXG4gICAgc3RlcDogMC4yNVxuXG4gICAgIyBiaW5kIHJlc2l6ZSBoYW5kbGVyP1xuICAgIG9uUmVzaXplOiB0cnVlXG5cbiAgICAjIHRoZSBtYXhpbXVtIGZvbnQgc2l6ZSBpbiBwaXhlbC4gc2V0IHRvICdpbml0aWFsJywgdG8gZGlzYWJsZVxuICAgICMgZ3Jvd2luZyBvdmVyIHRoZSBpbml0aWFsIGZvbnQgc2l6ZVxuICAgIG1heEZvbnRTaXplOiAxMDBcblxuICAgICMgdGhlIG1heGltdW0gZm9udCBzaXplIGluIHBpeGVsLiBzZXQgdG8gJ2luaXRpYWwnLCB0byBkaXNhYmxlXG4gICAgIyBzaHJpbmtpbmcgb3ZlciB0aGUgaW5pdGlhbCBmb250IHNpemVcbiAgICBtaW5Gb250U2l6ZTogMVxuXG5cbmNsYXNzIFNjcm9sbEZpdFxuICAgIGNvbnN0cnVjdG9yOiAoZWwsIG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgaWYgbm90IGVsIHRoZW4gcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgQG9wdGlvbnMgPSBfLmRlZmF1bHRzKCBvcHRpb25zLCBERUZBVUxUUyApXG5cbiAgICAgICAgQGVsID0gZWxcblxuICAgICAgICBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBAZWwgKVxuICAgICAgICBAZm9udFNpemUgPSBwYXJzZUludCggc3R5bGUuZm9udFNpemUgKVxuXG4gICAgICAgIGlmIG9wdGlvbnMubWF4Rm9udFNpemUgaXMgJ2luaXRpYWwnXG4gICAgICAgICAgICBAbWF4Rm9udFNpemUgPSBAZm9udFNpemVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQG1heEZvbnRTaXplID0gb3B0aW9ucy5tYXhGb250U2l6ZVxuXG4gICAgICAgIGlmIG9wdGlvbnMubWluRm9udFNpemUgaXMgJ2luaXRpYWwnXG4gICAgICAgICAgICBAbWluRm9udFNpemUgPSBAZm9udFNpemVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQG1pbkZvbnRTaXplID0gb3B0aW9ucy5taW5Gb250U2l6ZVxuXG4gICAgICAgIEBjYW5kaWRhdGUgPSBAbWF4Rm9udFNpemVcblxuICAgICAgICBpZiBAaW5Cb3VuZHMoKSB0aGVuIEBncm93KCkgZWxzZSBAc2hyaW5rKClcblxuICAgICAgICBpZiBAb3B0aW9ucy5vblJlc2l6ZVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEBvblJlc2l6ZS5iaW5kKEApXG5cbiAgICBvblJlc2l6ZTogLT5cbiAgICAgICAgaWYgbm90IEB0aWNraW5nXG4gICAgICAgICAgICBAdGlja2luZyA9IHRydWVcbiAgICAgICAgICAgIEBtYXhGb250U2l6ZSA9IHVuZGVmaW5lZFxuXG4gICAgICAgICAgICBpZiBAaW5Cb3VuZHMoKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIEBncm93LmJpbmQoQCkgKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIEBzaHJpbmsuYmluZChAKSApXG5cbiAgICBpbkJvdW5kczogLT5cbiAgICAgICAgcmV0dXJuIEBlbC5jbGllbnRIZWlnaHQgKyAoQGZvbnRTaXplIC8gOCkgPj0gQGVsLnNjcm9sbEhlaWdodCBhbmRcbiAgICAgICAgICAgICAgIEBlbC5jbGllbnRXaWR0aCAgKyAoQGZvbnRTaXplIC8gOCkgPj0gQGVsLnNjcm9sbFdpZHRoXG5cbiAgICBncm93OiAtPlxuICAgICAgICBAZm9udFNpemUgKz0gQG9wdGlvbnMuc3RlcFxuXG4gICAgICAgIGlmIEBmb250U2l6ZSA+PSBAY2FuZGlkYXRlIG9yIEBmb250U2l6ZSA+PSBAbWF4Rm9udFNpemVcbiAgICAgICAgICAgIHJldHVybiBAdGlja2luZyA9IGZhbHNlXG5cbiAgICAgICAgQGVsLnN0eWxlLmZvbnRTaXplID0gQGZvbnRTaXplICsgJ3B4J1xuXG4gICAgICAgIGlmIEBpbkJvdW5kcygpXG4gICAgICAgICAgICBAZ3JvdygpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBjYW5kaWRhdGUgPSBAZm9udFNpemVcbiAgICAgICAgICAgIEBzaHJpbmsoKVxuXG4gICAgc2hyaW5rOiAtPlxuICAgICAgICBAZm9udFNpemUgLT0gQG9wdGlvbnMuc3RlcFxuXG4gICAgICAgIGlmIEBmb250U2l6ZSA8PSBAbWluRm9udFNpemVcbiAgICAgICAgICAgIHJldHVybiBAdGlja2luZyA9IGZhbHNlXG5cbiAgICAgICAgQGVsLnN0eWxlLmZvbnRTaXplID0gQGZvbnRTaXplICsgJ3B4J1xuXG4gICAgICAgIGlmIEBpbkJvdW5kcygpIHRoZW4gQGdyb3coKSBlbHNlIEBzaHJpbmsoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LlNjcm9sbEZpdCA9IFNjcm9sbEZpdFxuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnYW1wLWlzLW9iamVjdCcpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmYXVsdHMob2JqKSB7XG4gICAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChvYmpbcHJvcF0gPT09IHZvaWQgMCkgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuICEhb2JqICYmICh0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnKTtcbn07XG4iLCIvKipcbiAqIHJlcXVlc3RBbmltYXRpb25GcmFtZSB2ZXJzaW9uOiBcIjAuMC4xN1wiIENvcHlyaWdodCAoYykgMjAxMS0yMDEyLCBDeXJpbCBBZ29zdGEgKCBjeXJpbC5hZ29zdGEuZGV2QGdtYWlsLmNvbSkgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIEF2YWlsYWJsZSB2aWEgdGhlIE1JVCBsaWNlbnNlLlxuICogc2VlOiBodHRwOi8vZ2l0aHViLmNvbS9jYWdvc3RhL3JlcXVlc3RBbmltYXRpb25GcmFtZSBmb3IgZGV0YWlsc1xuICpcbiAqIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gKiBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4gKiBNSVQgbGljZW5zZVxuICpcbiAqL1xuXG5cbiggZnVuY3Rpb24oIGdsb2JhbCApIHtcblxuXG4gICAgKCBmdW5jdGlvbigpIHtcblxuXG4gICAgICAgIGlmICggZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSApIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGdsb2JhbC53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKSB7IC8vIENocm9tZSA8PSAyMywgU2FmYXJpIDw9IDYuMSwgQmxhY2tiZXJyeSAxMFxuXG4gICAgICAgICAgICBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZ2xvYmFsWyAnd2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lJyBdO1xuICAgICAgICAgICAgZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZ2xvYmFsWyAnd2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUnIF0gfHwgZ2xvYmFsWyAnd2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJyBdO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJRSA8PSA5LCBBbmRyb2lkIDw9IDQuMywgdmVyeSBvbGQvcmFyZSBicm93c2Vyc1xuXG4gICAgICAgIHZhciBsYXN0VGltZSA9IDA7XG5cbiAgICAgICAgZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblxuICAgICAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoIDAsIDE2IC0gKCBjdXJyVGltZSAtIGxhc3RUaW1lICkgKTtcblxuICAgICAgICAgICAgdmFyIGlkID0gZ2xvYmFsLnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soIGN1cnJUaW1lICsgdGltZVRvQ2FsbCApO1xuXG4gICAgICAgICAgICB9LCB0aW1lVG9DYWxsICk7XG5cbiAgICAgICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gaWQ7IC8vIHJldHVybiB0aGUgaWQgZm9yIGNhbmNlbGxhdGlvbiBjYXBhYmlsaXRpZXNcblxuICAgICAgICB9O1xuXG4gICAgICAgIGdsb2JhbC5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKCBpZCApIHtcblxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCBpZCApO1xuXG4gICAgICAgIH07XG5cbiAgICB9ICkoKTtcblxuICAgIGlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyApIHtcblxuICAgICAgICBkZWZpbmUoIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuICAgICAgICB9ICk7XG5cbiAgICB9XG5cbn0gKSggd2luZG93ICk7Il19
