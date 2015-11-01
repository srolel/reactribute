'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _enhanceInstance = require('./enhance-instance.js');

var _enhanceInstance2 = _interopRequireDefault(_enhanceInstance);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

var getTransformMatcher = (0, _utils.cond)([function (x) {
  return typeof x === 'function';
}, function (x) {
  return x;
}], [function (x) {
  return _instanceof(x, RegExp);
}, function (x) {
  return function (_ref) {
    var type = _ref.type;
    var props = _ref.props;
    return x.test(type) || (0, _keys2.default)(props).some(function (k) {
      return x.test(k);
    });
  };
}], function (x) {
  return function (_ref2) {
    var type = _ref2.type;
    var props = _ref2.props;
    return type === x || x in props;
  };
});

var reactribute = function reactribute(transforms) {

  transforms = transforms.map(function (t) {
    t.matcher = getTransformMatcher(t.matcher);
    return t;
  });

  return (0, _enhanceInstance2.default)(function (element) {
    for (var i = 0, len = transforms.length; i < len; i++) {
      var _transforms$i = transforms[i];
      var matcher = _transforms$i.matcher;
      var fn = _transforms$i.fn;

      if (matcher(element)) {
        element = fn(element);
      }
    }

    return element;
  });
};

exports.default = reactribute;