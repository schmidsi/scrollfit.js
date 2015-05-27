(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/index.coffee":[function(require,module,exports){
var ScrollFit, domready, each;

domready = require('domready');

each = require('amp-each');

ScrollFit = (function() {
  function ScrollFit(el, options) {
    var style;
    this.el = el;
    this.updateBounds();
    this.maxFontSize = void 0;
    style = window.getComputedStyle(this.el);
    this.lastFontSize = this.initialFontSize = this.fontSize = parseInt(style.fontSize);
    console.log({
      el: el,
      inBounds: this.inBounds(),
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      clientWidth: el.clientWidth,
      scrollWidth: el.scrollWidth
    });
    if (this.inBounds()) {
      this.grow();
    } else {
      this.shrink();
    }
  }

  ScrollFit.prototype.updateBounds = function() {
    this.clientHeight = this.el.clientHeight;
    this.scrollHeight = this.el.scrollHeight;
    this.clientWidth = this.el.clientWidth;
    return this.scrollWidth = this.el.scrollWidth;
  };

  ScrollFit.prototype.inBounds = function() {
    return this.clientHeight >= this.scrollHeight && this.clientWidth >= this.scrollWidth;
  };

  ScrollFit.prototype.grow = function() {
    this.lastFontSize = this.fontSize;
    this.fontSize++;
    if (this.fontSize >= this.maxFontSize) {
      return false;
    }
    this.el.style.fontSize = this.fontSize + 'px';
    this.updateBounds();
    if (this.inBounds()) {
      return this.grow();
    } else {
      this.maxFontSize = this.fontSize;
      return this.shrink();
    }
  };

  ScrollFit.prototype.shrink = function() {
    this.lastFontSize = this.fontSize;
    this.fontSize--;
    this.el.style.fontSize = this.fontSize + 'px';
    this.updateBounds();
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



},{"amp-each":"/Users/simon/Development/scrollfit.js/node_modules/amp-each/each.js","domready":"/Users/simon/Development/scrollfit.js/node_modules/domready/ready.js"}],"/Users/simon/Development/scrollfit.js/node_modules/amp-each/each.js":[function(require,module,exports){
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
module.exports = function isObject(obj) {
    var type = typeof obj;
    return !!obj && (type === 'function' || type === 'object');
};

},{}],"/Users/simon/Development/scrollfit.js/node_modules/domready/ready.js":[function(require,module,exports){
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

},{}]},{},["./src/index.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2ltb24vRGV2ZWxvcG1lbnQvc2Nyb2xsZml0LmpzL3NyYy9pbmRleC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYW1wLWVhY2gvZWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9hbXAtZWFjaC9ub2RlX21vZHVsZXMvYW1wLWNyZWF0ZS1jYWxsYmFjay9jcmVhdGUtY2FsbGJhY2suanMiLCJub2RlX21vZHVsZXMvYW1wLWVhY2gvbm9kZV9tb2R1bGVzL2FtcC1rZXlzL2tleXMuanMiLCJub2RlX21vZHVsZXMvYW1wLWVhY2gvbm9kZV9tb2R1bGVzL2FtcC1rZXlzL25vZGVfbW9kdWxlcy9hbXAtaGFzL2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9hbXAtZWFjaC9ub2RlX21vZHVsZXMvYW1wLWtleXMvbm9kZV9tb2R1bGVzL2FtcC1pbmRleC1vZi9pbmRleC1vZi5qcyIsIm5vZGVfbW9kdWxlcy9hbXAtZWFjaC9ub2RlX21vZHVsZXMvYW1wLWtleXMvbm9kZV9tb2R1bGVzL2FtcC1pbmRleC1vZi9ub2RlX21vZHVsZXMvYW1wLWlzLW51bWJlci9pcy1udW1iZXIuanMiLCJub2RlX21vZHVsZXMvYW1wLWVhY2gvbm9kZV9tb2R1bGVzL2FtcC1rZXlzL25vZGVfbW9kdWxlcy9hbXAtaXMtb2JqZWN0L2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9kb21yZWFkeS9yZWFkeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUEseUJBQUE7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSLENBQVgsQ0FBQTs7QUFBQSxJQUNBLEdBQVcsT0FBQSxDQUFRLFVBQVIsQ0FEWCxDQUFBOztBQUFBO0FBS2lCLEVBQUEsbUJBQUMsRUFBRCxFQUFLLE9BQUwsR0FBQTtBQUNULFFBQUEsS0FBQTtBQUFBLElBQUEsSUFBQyxDQUFB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QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiNfcmFmICAgICA9IHJlcXVpcmUgJ3JlcXVlc3RhbmltYXRpb25mcmFtZSdcbmRvbXJlYWR5ID0gcmVxdWlyZSAnZG9tcmVhZHknXG5lYWNoICAgICA9IHJlcXVpcmUgJ2FtcC1lYWNoJ1xuXG5cbmNsYXNzIFNjcm9sbEZpdFxuICAgIGNvbnN0cnVjdG9yOiAoZWwsIG9wdGlvbnMpIC0+XG4gICAgICAgIEBlbCA9IGVsXG4gICAgICAgIEB1cGRhdGVCb3VuZHMoKVxuICAgICAgICBAbWF4Rm9udFNpemUgPSB1bmRlZmluZWRcblxuICAgICAgICBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBAZWwgKVxuICAgICAgICBAbGFzdEZvbnRTaXplID0gQGluaXRpYWxGb250U2l6ZSA9IEBmb250U2l6ZSA9IHBhcnNlSW50KCBzdHlsZS5mb250U2l6ZSApXG5cbiAgICAgICAgY29uc29sZS5sb2dcbiAgICAgICAgICAgIGVsOiBlbFxuICAgICAgICAgICAgaW5Cb3VuZHM6IEBpbkJvdW5kcygpXG4gICAgICAgICAgICBjbGllbnRIZWlnaHQ6IGVsLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0OiBlbC5zY3JvbGxIZWlnaHRcbiAgICAgICAgICAgIGNsaWVudFdpZHRoOiBlbC5jbGllbnRXaWR0aFxuICAgICAgICAgICAgc2Nyb2xsV2lkdGg6IGVsLnNjcm9sbFdpZHRoXG5cbiAgICAgICAgaWYgQGluQm91bmRzKCkgdGhlbiBAZ3JvdygpIGVsc2UgQHNocmluaygpXG5cblxuICAgIHVwZGF0ZUJvdW5kczogLT5cbiAgICAgICAgQGNsaWVudEhlaWdodCA9IEBlbC5jbGllbnRIZWlnaHRcbiAgICAgICAgQHNjcm9sbEhlaWdodCA9IEBlbC5zY3JvbGxIZWlnaHRcbiAgICAgICAgQGNsaWVudFdpZHRoID0gQGVsLmNsaWVudFdpZHRoXG4gICAgICAgIEBzY3JvbGxXaWR0aCA9IEBlbC5zY3JvbGxXaWR0aFxuXG4gICAgaW5Cb3VuZHM6IC0+XG4gICAgICAgIHJldHVybiBAY2xpZW50SGVpZ2h0ID49IEBzY3JvbGxIZWlnaHQgYW5kXG4gICAgICAgICAgICBAY2xpZW50V2lkdGggPj0gQHNjcm9sbFdpZHRoXG5cbiAgICBncm93OiAtPlxuICAgICAgICBAbGFzdEZvbnRTaXplID0gQGZvbnRTaXplXG4gICAgICAgIEBmb250U2l6ZSsrXG5cbiAgICAgICAgaWYgQGZvbnRTaXplID49IEBtYXhGb250U2l6ZSB0aGVuIHJldHVybiBmYWxzZVxuXG4gICAgICAgIEBlbC5zdHlsZS5mb250U2l6ZSA9IEBmb250U2l6ZSArICdweCdcblxuICAgICAgICBAdXBkYXRlQm91bmRzKClcblxuICAgICAgICBpZiBAaW5Cb3VuZHMoKVxuICAgICAgICAgICAgQGdyb3coKVxuICAgICAgICAgICAgIyByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggQGdyb3cuYmluZChAKSApXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBtYXhGb250U2l6ZSA9IEBmb250U2l6ZVxuICAgICAgICAgICAgQHNocmluaygpXG4gICAgICAgICAgICAjcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIEBzaHJpbmsuYmluZChAKSApXG5cbiAgICBzaHJpbms6IC0+XG4gICAgICAgIEBsYXN0Rm9udFNpemUgPSBAZm9udFNpemVcbiAgICAgICAgQGZvbnRTaXplLS1cblxuICAgICAgICBAZWwuc3R5bGUuZm9udFNpemUgPSBAZm9udFNpemUgKyAncHgnXG5cbiAgICAgICAgQHVwZGF0ZUJvdW5kcygpXG5cbiAgICAgICAgaWYgQGluQm91bmRzKCkgdGhlbiBAZ3JvdygpIGVsc2UgQHNocmluaygpXG5cblxuICAgICAgICAjICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIEBncm93LmJpbmQoQCkgKVxuICAgICAgICAjZWxzZVxuICAgICAgICAjICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIEBzaHJpbmsuYmluZChAKSApXG5cblxuXG5cblxuZG9tcmVhZHkgLT5cbiAgICBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ob29rfj1zY3JvbGxmaXRdJylcblxuICAgIGVhY2ggZWxzLCAoZWwpIC0+XG4gICAgICAgIG5ldyBTY3JvbGxGaXQoZWwpXG4iLCJ2YXIgb2JqS2V5cyA9IHJlcXVpcmUoJ2FtcC1rZXlzJyk7XG52YXIgY3JlYXRlQ2FsbGJhY2sgPSByZXF1aXJlKCdhbXAtY3JlYXRlLWNhbGxiYWNrJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiBvYmo7XG4gICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGksIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gK2xlbmd0aCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGl0ZXJhdGVlKG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gb2JqS2V5cyhvYmopO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUNhbGxiYWNrKGZ1bmMsIGNvbnRleHQsIGFyZ0NvdW50KSB7XG4gICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgcmV0dXJuIGZ1bmM7XG4gICAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgY2FzZSAyOiBcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgb3RoZXIpO1xuICAgICAgICB9O1xuICAgIGNhc2UgMzogXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICBjYXNlIDQ6IFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJ2FtcC1oYXMnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnYW1wLWluZGV4LW9mJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCdhbXAtaXMtb2JqZWN0Jyk7XG52YXIgbmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGhhc0VudW1CdWcgPSAhKHt0b1N0cmluZzogbnVsbH0pLnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpO1xudmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsnY29uc3RydWN0b3InLCAndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ2hhc093blByb3BlcnR5JywgJ3RvTG9jYWxlU3RyaW5nJ107XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBrZXlzKG9iaikge1xuICAgIGlmICghaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIGlmIChuYXRpdmVLZXlzKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVLZXlzKG9iaik7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoaGFzKG9iaiwga2V5KSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgICAvLyBJRSA8IDlcbiAgICBpZiAoaGFzRW51bUJ1Zykge1xuICAgICAgICB2YXIgbm9uRW51bUlkeCA9IG5vbkVudW1lcmFibGVQcm9wcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChub25FbnVtSWR4LS0pIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gbm9uRW51bWVyYWJsZVByb3BzW25vbkVudW1JZHhdO1xuICAgICAgICAgICAgaWYgKGhhcyhvYmosIHByb3ApICYmIGluZGV4T2YocmVzdWx0LCBwcm9wKSA9PT0gLTEpIHJlc3VsdC5wdXNoKHByb3ApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcbiIsInZhciBpc051bWJlciA9IHJlcXVpcmUoJ2FtcC1pcy1udW1iZXInKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluZGV4T2YoYXJyLCBpdGVtLCBmcm9tKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsID0gYXJyICYmIGFyci5sZW5ndGg7XG4gICAgaWYgKGlzTnVtYmVyKGZyb20pKSB7XG4gICAgICAgIGkgPSBmcm9tIDwgMCA/IE1hdGgubWF4KDAsIGwgKyBmcm9tKSA6IGZyb207XG4gICAgfVxuICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59O1xuIiwidmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTnVtYmVyKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiAhIW9iaiAmJiAodHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0Jyk7XG59O1xuIiwiLyohXG4gICogZG9tcmVhZHkgKGMpIER1c3RpbiBEaWF6IDIwMTQgLSBMaWNlbnNlIE1JVFxuICAqL1xuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxuXG59KCdkb21yZWFkeScsIGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZm5zID0gW10sIGxpc3RlbmVyXG4gICAgLCBkb2MgPSBkb2N1bWVudFxuICAgICwgaGFjayA9IGRvYy5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGxcbiAgICAsIGRvbUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCdcbiAgICAsIGxvYWRlZCA9IChoYWNrID8gL15sb2FkZWR8XmMvIDogL15sb2FkZWR8Xml8XmMvKS50ZXN0KGRvYy5yZWFkeVN0YXRlKVxuXG5cbiAgaWYgKCFsb2FkZWQpXG4gIGRvYy5hZGRFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyKVxuICAgIGxvYWRlZCA9IDFcbiAgICB3aGlsZSAobGlzdGVuZXIgPSBmbnMuc2hpZnQoKSkgbGlzdGVuZXIoKVxuICB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICBsb2FkZWQgPyBzZXRUaW1lb3V0KGZuLCAwKSA6IGZucy5wdXNoKGZuKVxuICB9XG5cbn0pO1xuIl19
