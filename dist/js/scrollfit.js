(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/index.coffee":[function(require,module,exports){
var ScrollFit, _raf, defaults, domready, each;

_raf = require('requestanimationframe');

domready = require('domready');

defaults = require('amp-defaults');

each = require('amp-each');

ScrollFit = (function() {
  function ScrollFit(el, options) {
    var style;
    if (options == null) {
      options = {};
    }
    this.options = defaults(options, {
      step: 0.25,
      onResize: true
    });
    this.el = el;
    this.maxFontSize = void 0;
    style = window.getComputedStyle(this.el);
    this.lastFontSize = this.initialFontSize = this.fontSize = parseInt(style.fontSize);
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
    this.lastFontSize = this.fontSize;
    this.fontSize += this.options.step;
    if (this.fontSize >= this.maxFontSize) {
      this.ticking = false;
      return false;
    }
    this.el.style.fontSize = this.fontSize + 'px';
    if (this.inBounds()) {
      return this.grow();
    } else {
      this.maxFontSize = this.fontSize;
      return this.shrink();
    }
  };

  ScrollFit.prototype.shrink = function() {
    this.lastFontSize = this.fontSize;
    this.fontSize -= this.options.step;
    this.el.style.fontSize = this.fontSize + 'px';
    if (this.inBounds()) {
      return this.grow();
    } else {
      return this.shrink();
    }
  };

  return ScrollFit;

})();

domready(function() {
  var els;
  els = document.querySelectorAll('[data-hook~=scrollfit]');
  return each(els, function(el) {
    return new ScrollFit(el);
  });
});

module.exports = ScrollFit;



},{"amp-defaults":"/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/defaults.js","amp-each":"/Users/simon/Development/scrollfit.js/node_modules/amp-each/each.js","domready":"/Users/simon/Development/scrollfit.js/node_modules/domready/ready.js","requestanimationframe":"/Users/simon/Development/scrollfit.js/node_modules/requestanimationframe/app/requestAnimationFrame.js"}],"/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/defaults.js":[function(require,module,exports){
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

},{}],"/Users/simon/Development/scrollfit.js/node_modules/amp-each/each.js":[function(require,module,exports){
var objKeys = require('amp-keys');
var createCallback = require('amp-create-callback');


module.exports = function each(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
        for (i = 0; i < length; i++) {
            iteratee(obj[i], i, obj);
        }
    } else {
        var keys = objKeys(obj);
        for (i = 0, length = keys.length; i < length; i++) {
            iteratee(obj[keys[i]], keys[i], obj);
        }
    }
    return obj;
};

},{"amp-create-callback":"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-create-callback/create-callback.js","amp-keys":"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/keys.js"}],"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-create-callback/create-callback.js":[function(require,module,exports){
module.exports = function createCallback(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount) {
    case 1: 
        return function(value) {
            return func.call(context, value);
        };
    case 2: 
        return function(value, other) {
            return func.call(context, value, other);
        };
    case 3: 
        return function(value, index, collection) {
            return func.call(context, value, index, collection);
        };
    case 4: 
        return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
        return func.apply(context, arguments);
    };
};

},{}],"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/keys.js":[function(require,module,exports){
var has = require('amp-has');
var indexOf = require('amp-index-of');
var isObject = require('amp-is-object');
var nativeKeys = Object.keys;
var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];


module.exports = function keys(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) {
        return nativeKeys(obj);
    }
    var result = [];
    for (var key in obj) if (has(obj, key)) result.push(key);
    // IE < 9
    if (hasEnumBug) {
        var nonEnumIdx = nonEnumerableProps.length;
        while (nonEnumIdx--) {
            var prop = nonEnumerableProps[nonEnumIdx];
            if (has(obj, prop) && indexOf(result, prop) === -1) result.push(prop);
        }
    }
    return result;
};

},{"amp-has":"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/node_modules/amp-has/has.js","amp-index-of":"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/node_modules/amp-index-of/index-of.js","amp-is-object":"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/node_modules/amp-is-object/is-object.js"}],"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/node_modules/amp-has/has.js":[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;


module.exports = function has(obj, key) {
    return obj != null && hasOwn.call(obj, key);
};

},{}],"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/node_modules/amp-index-of/index-of.js":[function(require,module,exports){
var isNumber = require('amp-is-number');


module.exports = function indexOf(arr, item, from) {
    var i = 0;
    var l = arr && arr.length;
    if (isNumber(from)) {
        i = from < 0 ? Math.max(0, l + from) : from;
    }
    for (; i < l; i++) {
        if (arr[i] === item) return i;
    }
    return -1;
};

},{"amp-is-number":"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/node_modules/amp-index-of/node_modules/amp-is-number/is-number.js"}],"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/node_modules/amp-index-of/node_modules/amp-is-number/is-number.js":[function(require,module,exports){
var toString = Object.prototype.toString;


module.exports = function isNumber(obj) {
    return toString.call(obj) === '[object Number]';
};

},{}],"/Users/simon/Development/scrollfit.js/node_modules/amp-each/node_modules/amp-keys/node_modules/amp-is-object/is-object.js":[function(require,module,exports){
module.exports=require("/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/node_modules/amp-is-object/is-object.js")
},{"/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/node_modules/amp-is-object/is-object.js":"/Users/simon/Development/scrollfit.js/node_modules/amp-defaults/node_modules/amp-is-object/is-object.js"}],"/Users/simon/Development/scrollfit.js/node_modules/domready/ready.js":[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2ltb24vRGV2ZWxvcG1lbnQvc2Nyb2xsZml0LmpzL3NyYy9pbmRleC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYW1wLWRlZmF1bHRzL2RlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2FtcC1kZWZhdWx0cy9ub2RlX21vZHVsZXMvYW1wLWlzLW9iamVjdC9pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvYW1wLWVhY2gvZWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9hbXAtZWFjaC9ub2RlX21vZHVsZXMvYW1wLWNyZWF0ZS1jYWxsYmFjay9jcmVhdGUtY2FsbGJhY2suanMiLCJub2RlX21vZHVsZXMvYW1wLWVhY2gvbm9kZV9tb2R1bGVzL2FtcC1rZXlzL2tleXMuanMiLCJub2RlX21vZHVsZXMvYW1wLWVhY2gvbm9kZV9tb2R1bGVzL2FtcC1rZXlzL25vZGVfbW9kdWxlcy9hbXAtaGFzL2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9hbXAtZWFjaC9ub2RlX21vZHVsZXMvYW1wLWtleXMvbm9kZV9tb2R1bGVzL2FtcC1pbmRleC1vZi9pbmRleC1vZi5qcyIsIm5vZGVfbW9kdWxlcy9hbXAtZWFjaC9ub2RlX21vZHVsZXMvYW1wLWtleXMvbm9kZV9tb2R1bGVzL2FtcC1pbmRleC1vZi9ub2RlX21vZHVsZXMvYW1wLWlzLW51bWJlci9pcy1udW1iZXIuanMiLCJub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiLCJub2RlX21vZHVsZXMvcmVxdWVzdGFuaW1hdGlvbmZyYW1lL2FwcC9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLHlDQUFBOztBQUFBLElBQUEsR0FBVyxPQUFBLENBQVEsdUJBQVIsQ0FBWCxDQUFBOztBQUFBLFFBQ0EsR0FBVyxPQUFBLENBQVEsVUFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIl9yYWYgICAgID0gcmVxdWlyZSAncmVxdWVzdGFuaW1hdGlvbmZyYW1lJ1xuZG9tcmVhZHkgPSByZXF1aXJlICdkb21yZWFkeSdcbmRlZmF1bHRzID0gcmVxdWlyZSAnYW1wLWRlZmF1bHRzJ1xuZWFjaCAgICAgPSByZXF1aXJlICdhbXAtZWFjaCdcblxuXG5jbGFzcyBTY3JvbGxGaXRcbiAgICBjb25zdHJ1Y3RvcjogKGVsLCBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBvcHRpb25zID0gZGVmYXVsdHMgb3B0aW9ucyxcbiAgICAgICAgICAgIHN0ZXA6IDAuMjUgICAgICAjIGFtb3VudCBvZiBpbmNyZWFzaW5nIG9yIGRlY3JlYXNpbmcgdGhlIGZvbnRzaXplXG4gICAgICAgICAgICBvblJlc2l6ZTogdHJ1ZSAgIyBiaW5kIHJlc2l6ZSBoYW5kbGVyP1xuXG4gICAgICAgIEBlbCA9IGVsXG4gICAgICAgIEBtYXhGb250U2l6ZSA9IHVuZGVmaW5lZFxuXG4gICAgICAgIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIEBlbCApXG4gICAgICAgIEBsYXN0Rm9udFNpemUgPSBAaW5pdGlhbEZvbnRTaXplID0gQGZvbnRTaXplID0gcGFyc2VJbnQoIHN0eWxlLmZvbnRTaXplIClcblxuICAgICAgICBpZiBAaW5Cb3VuZHMoKSB0aGVuIEBncm93KCkgZWxzZSBAc2hyaW5rKClcblxuICAgICAgICBpZiBAb3B0aW9ucy5vblJlc2l6ZVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEBvblJlc2l6ZS5iaW5kKEApXG5cbiAgICBvblJlc2l6ZTogLT5cbiAgICAgICAgaWYgbm90IEB0aWNraW5nXG4gICAgICAgICAgICBAdGlja2luZyA9IHRydWVcbiAgICAgICAgICAgIEBtYXhGb250U2l6ZSA9IHVuZGVmaW5lZFxuXG5cbiAgICAgICAgICAgIGlmIEBpbkJvdW5kcygpXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggQGdyb3cuYmluZChAKSApXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggQHNocmluay5iaW5kKEApIClcblxuICAgIGluQm91bmRzOiAtPlxuICAgICAgICByZXR1cm4gQGVsLmNsaWVudEhlaWdodCArIChAZm9udFNpemUgLyA4KSA+PSBAZWwuc2Nyb2xsSGVpZ2h0IGFuZFxuICAgICAgICAgICAgICAgQGVsLmNsaWVudFdpZHRoICArIChAZm9udFNpemUgLyA4KSA+PSBAZWwuc2Nyb2xsV2lkdGhcblxuICAgIGdyb3c6IC0+XG4gICAgICAgIEBsYXN0Rm9udFNpemUgPSBAZm9udFNpemVcbiAgICAgICAgQGZvbnRTaXplICs9IEBvcHRpb25zLnN0ZXBcblxuICAgICAgICBpZiBAZm9udFNpemUgPj0gQG1heEZvbnRTaXplXG4gICAgICAgICAgICBAdGlja2luZyA9IGZhbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICBAZWwuc3R5bGUuZm9udFNpemUgPSBAZm9udFNpemUgKyAncHgnXG5cbiAgICAgICAgaWYgQGluQm91bmRzKClcbiAgICAgICAgICAgIEBncm93KClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQG1heEZvbnRTaXplID0gQGZvbnRTaXplXG4gICAgICAgICAgICBAc2hyaW5rKClcblxuICAgIHNocmluazogLT5cbiAgICAgICAgQGxhc3RGb250U2l6ZSA9IEBmb250U2l6ZVxuICAgICAgICBAZm9udFNpemUgLT0gQG9wdGlvbnMuc3RlcFxuXG4gICAgICAgIEBlbC5zdHlsZS5mb250U2l6ZSA9IEBmb250U2l6ZSArICdweCdcblxuICAgICAgICBpZiBAaW5Cb3VuZHMoKSB0aGVuIEBncm93KCkgZWxzZSBAc2hyaW5rKClcblxuXG5kb21yZWFkeSAtPlxuICAgIGVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWhvb2t+PXNjcm9sbGZpdF0nKVxuXG4gICAgZWFjaCBlbHMsIChlbCkgLT5cbiAgICAgICAgbmV3IFNjcm9sbEZpdChlbClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbEZpdFxuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnYW1wLWlzLW9iamVjdCcpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmYXVsdHMob2JqKSB7XG4gICAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChvYmpbcHJvcF0gPT09IHZvaWQgMCkgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuICEhb2JqICYmICh0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnKTtcbn07XG4iLCJ2YXIgb2JqS2V5cyA9IHJlcXVpcmUoJ2FtcC1rZXlzJyk7XG52YXIgY3JlYXRlQ2FsbGJhY2sgPSByZXF1aXJlKCdhbXAtY3JlYXRlLWNhbGxiYWNrJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiBvYmo7XG4gICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGksIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gK2xlbmd0aCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGl0ZXJhdGVlKG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gb2JqS2V5cyhvYmopO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUNhbGxiYWNrKGZ1bmMsIGNvbnRleHQsIGFyZ0NvdW50KSB7XG4gICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgcmV0dXJuIGZ1bmM7XG4gICAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgY2FzZSAyOiBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgb3RoZXIpO1xuICAgICAgICB9O1xuICAgIGNhc2UgMzogXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICBjYXNlIDQ6IFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJ2FtcC1oYXMnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnYW1wLWluZGV4LW9mJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCdhbXAtaXMtb2JqZWN0Jyk7XG52YXIgbmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGhhc0VudW1CdWcgPSAhKHt0b1N0cmluZzogbnVsbH0pLnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpO1xudmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsnY29uc3RydWN0b3InLCAndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ2hhc093blByb3BlcnR5JywgJ3RvTG9jYWxlU3RyaW5nJ107XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBrZXlzKG9iaikge1xuICAgIGlmICghaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIGlmIChuYXRpdmVLZXlzKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVLZXlzKG9iaik7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoaGFzKG9iaiwga2V5KSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgICAvLyBJRSA8IDlcbiAgICBpZiAoaGFzRW51bUJ1Zykge1xuICAgICAgICB2YXIgbm9uRW51bUlkeCA9IG5vbkVudW1lcmFibGVQcm9wcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChub25FbnVtSWR4LS0pIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gbm9uRW51bWVyYWJsZVByb3BzW25vbkVudW1JZHhdO1xuICAgICAgICAgICAgaWYgKGhhcyhvYmosIHByb3ApICYmIGluZGV4T2YocmVzdWx0LCBwcm9wKSA9PT0gLTEpIHJlc3VsdC5wdXNoKHByb3ApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcbiIsInZhciBpc051bWJlciA9IHJlcXVpcmUoJ2FtcC1pcy1udW1iZXInKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluZGV4T2YoYXJyLCBpdGVtLCBmcm9tKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsID0gYXJyICYmIGFyci5sZW5ndGg7XG4gICAgaWYgKGlzTnVtYmVyKGZyb20pKSB7XG4gICAgICAgIGkgPSBmcm9tIDwgMCA/IE1hdGgubWF4KDAsIGwgKyBmcm9tKSA6IGZyb207XG4gICAgfVxuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59O1xuIiwidmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTnVtYmVyKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xufTtcbiIsIi8qIVxuICAqIGRvbXJlYWR5IChjKSBEdXN0aW4gRGlheiAyMDE0IC0gTGljZW5zZSBNSVRcbiAgKi9cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcblxufSgnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZucyA9IFtdLCBsaXN0ZW5lclxuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGhhY2sgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsXG4gICAgLCBkb21Db250ZW50TG9hZGVkID0gJ0RPTUNvbnRlbnRMb2FkZWQnXG4gICAgLCBsb2FkZWQgPSAoaGFjayA/IC9ebG9hZGVkfF5jLyA6IC9ebG9hZGVkfF5pfF5jLykudGVzdChkb2MucmVhZHlTdGF0ZSlcblxuXG4gIGlmICghbG9hZGVkKVxuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lcilcbiAgICBsb2FkZWQgPSAxXG4gICAgd2hpbGUgKGxpc3RlbmVyID0gZm5zLnNoaWZ0KCkpIGxpc3RlbmVyKClcbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgbG9hZGVkID8gc2V0VGltZW91dChmbiwgMCkgOiBmbnMucHVzaChmbilcbiAgfVxuXG59KTtcbiIsIi8qKlxuICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHZlcnNpb246IFwiMC4wLjE3XCIgQ29weXJpZ2h0IChjKSAyMDExLTIwMTIsIEN5cmlsIEFnb3N0YSAoIGN5cmlsLmFnb3N0YS5kZXZAZ21haWwuY29tKSBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogQXZhaWxhYmxlIHZpYSB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBzZWU6IGh0dHA6Ly9naXRodWIuY29tL2NhZ29zdGEvcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZvciBkZXRhaWxzXG4gKlxuICogaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAqIGh0dHA6Ly9teS5vcGVyYS5jb20vZW1vbGxlci9ibG9nLzIwMTEvMTIvMjAvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1lci1hbmltYXRpbmdcbiAqIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBieSBFcmlrIE3DtmxsZXIuIGZpeGVzIGZyb20gUGF1bCBJcmlzaCBhbmQgVGlubyBaaWpkZWxcbiAqIE1JVCBsaWNlbnNlXG4gKlxuICovXG5cblxuKCBmdW5jdGlvbiggZ2xvYmFsICkge1xuXG5cbiAgICAoIGZ1bmN0aW9uKCkge1xuXG5cbiAgICAgICAgaWYgKCBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lICkge1xuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggZ2xvYmFsLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSApIHsgLy8gQ2hyb21lIDw9IDIzLCBTYWZhcmkgPD0gNi4xLCBCbGFja2JlcnJ5IDEwXG5cbiAgICAgICAgICAgIGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBnbG9iYWxbICd3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG4gICAgICAgICAgICBnbG9iYWwuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBnbG9iYWxbICd3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZScgXSB8fCBnbG9iYWxbICd3ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElFIDw9IDksIEFuZHJvaWQgPD0gNC4zLCB2ZXJ5IG9sZC9yYXJlIGJyb3dzZXJzXG5cbiAgICAgICAgdmFyIGxhc3RUaW1lID0gMDtcblxuICAgICAgICBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXG4gICAgICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCggMCwgMTYgLSAoIGN1cnJUaW1lIC0gbGFzdFRpbWUgKSApO1xuXG4gICAgICAgICAgICB2YXIgaWQgPSBnbG9iYWwuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayggY3VyclRpbWUgKyB0aW1lVG9DYWxsICk7XG5cbiAgICAgICAgICAgIH0sIHRpbWVUb0NhbGwgKTtcblxuICAgICAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG5cbiAgICAgICAgICAgIHJldHVybiBpZDsgLy8gcmV0dXJuIHRoZSBpZCBmb3IgY2FuY2VsbGF0aW9uIGNhcGFiaWxpdGllc1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oIGlkICkge1xuXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoIGlkICk7XG5cbiAgICAgICAgfTtcblxuICAgIH0gKSgpO1xuXG4gICAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICkge1xuXG4gICAgICAgIGRlZmluZSggZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG4gICAgICAgIH0gKTtcblxuICAgIH1cblxufSApKCB3aW5kb3cgKTsiXX0=
