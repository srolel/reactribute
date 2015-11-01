'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var maybeExecute = exports.maybeExecute = function maybeExecute(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof fn === 'function' ? fn.apply(undefined, args) : fn;
};

var cond = exports.cond = function cond() {
  for (var _len2 = arguments.length, tests = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    tests[_key2] = arguments[_key2];
  }

  var _default = Array.isArray(tests[tests.length - 1]) ? null : tests.pop();

  return function (arg) {

    for (var i = 0, len = tests.length; i < len; i++) {
      var pred = tests[i];
      if (pred[0](arg)) {
        return maybeExecute(pred[1], arg);
      }
    }

    if (_default) {
      return maybeExecute(_default, arg);
    }
  };
};

var extend = exports.extend = function extend(obj1, obj2) {
  var ret = {};

  for (var k in obj2) {
    if (obj2.hasOwnProperty(k)) {
      ret[k] = obj2[k];
    }
  }

  for (var k in obj1) {
    if (!(k in ret) && obj1.hasOwnProperty(k)) {
      ret[k] = obj2[k];
    }
  }

  return ret;
};