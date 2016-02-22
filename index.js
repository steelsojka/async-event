'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.AsyncEvent = factory();
  }
}(this, function () {

  /**
   * An event that handles async interception.
   * @param {any} value Initial value.
   * @param {Promise} [promise] 
   */
  function AsyncEvent(value, promise) {
    if (!(this instanceof AsyncEvent)) {
      return new AsyncEvent(value, promise);
    }

    promise = isThenable(promise) ? promise : Promise.resolve(value);

    assign(this, {
      getValue: getValue,
      intercept: intercept,
      then: then,

      // Catch is a reserved word so we can't have a named function :(
      catch: function() {
        return promise.catch.apply(promise, arguments);
      }
    });

    function getValue() {
      return value;
    }

    function intercept(handler) {
      promise = promise.then(handler);
    }

    function then() {
      return promise.then.apply(promise, arguments);
    }
  }

  function isThenable(obj) {
    return typeof obj === 'object' && typeof obj.then === 'function';
  }

  function assign(target, map) {
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        Object.defineProperty(target, key, {
          value: map[key],
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
    }
  }

  return AsyncEvent;
}));
