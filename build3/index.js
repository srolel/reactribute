'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enhanceInstanceJs = require('./enhance-instance.js');

var _enhanceInstanceJs2 = _interopRequireDefault(_enhanceInstanceJs);

var _utilsJs = require('./utils.js');

var reactribute = function reactribute(transforms) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var deep = _ref.deep;

  var matchers = reactribute.matchers.concat(reactribute.defaultMatcher);
  var getTransformMatcher = _utilsJs.cond.apply(undefined, _toConsumableArray(matchers));

  transforms = transforms.map(function (t) {
    t.matcher = getTransformMatcher(t.matcher);
    return t;
  });

  var decorator = (0, _enhanceInstanceJs2['default'])(function (element) {
    var ret = {},
        result = element;
    if (deep && typeof element.type === 'function') {
      element.type = decorator(element.type);
    }

    for (var i = 0, len = transforms.length; i < len; i++) {
      var _transforms$i = transforms[i];
      var matcher = _transforms$i.matcher;
      var fn = _transforms$i.fn;

      if (matcher === true || matcher(element)) {
        var transformed = fn(result);
        if (!transformed) {
          return transformed;
        }
        result = (0, _utilsJs.resolveElementParams)(result, transformed);
      }
    }
    return result;
  });

  return decorator;
};

reactribute.matchers = [[function (x) {
  return typeof x === 'function';
}, function (x) {
  return x;
}], [function (x) {
  return x instanceof RegExp;
}, function (x) {
  return function (_ref2) {
    var type = _ref2.type;
    var props = _ref2.props;
    return x.test(type) || Object.keys(props).some(function (k) {
      return x.test(k);
    });
  };
}]];

reactribute.defaultMatcher = function (x) {
  return function (_ref3) {
    var type = _ref3.type;
    var key = _ref3.key;
    var props = _ref3.props;
    return type === x || key === x || x in props;
  };
};

exports['default'] = reactribute;
module.exports = exports['default'];