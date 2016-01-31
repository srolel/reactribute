'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var maybeExecute = function maybeExecute(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof fn === 'function' ? fn.apply(undefined, args) : fn;
};

exports.maybeExecute = maybeExecute;
var cond = function cond() {
  for (var _len2 = arguments.length, tests = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    tests[_key2] = arguments[_key2];
  }

  var _default = Array.isArray(tests[tests.length - 1]) ? null : tests.pop();

  return function (arg) {

    for (var i = 0, len = tests.length; i < len; i++) {
      var test = tests[i];
      if (test[0](arg)) {
        return maybeExecute(test[1], arg);
      }
    }

    if (_default) {
      return maybeExecute(_default, arg);
    }
  };
};

exports.cond = cond;
var isObject = function isObject(x) {
  return typeof x === 'object';
};

var resolveElementParams = function resolveElementParams(originalInstance, transformationResult) {
  var type = transformationResult.type;
  var props = transformationResult.props;
  var children = transformationResult.children;

  props = props ? _extends({}, originalInstance.props, props) : originalInstance.props;

  if (type && type !== originalInstance.type && type.defaultProps) {
    props = _extends({}, type.defaultProps, props);
  }

  children = children || props && props.children;
  type = type || originalInstance.type;

  var key = props.key || transformationResult.key || originalInstance.key || undefined;
  var ref = props.ref || transformationResult.ref || originalInstance.ref || undefined;

  return { type: type, props: props, children: children, key: key, ref: ref };
};

exports.resolveElementParams = resolveElementParams;
var flatten = function flatten(arr) {
  return Array.isArray(arr) ? Array.prototype.concat.apply([], arr) : arr;
};
exports.flatten = flatten;