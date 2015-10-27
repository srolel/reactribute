'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var applyFnToAllElements = function applyFnToAllElements(inst, fn) {

  if (!inst) {
    return;
  }

  inst = fn(inst);

  if (inst.props && inst.props.children) {
    return _react2['default'].cloneElement(inst, {}, _react2['default'].Children.map(inst.props.children, function (c) {
      return applyFnToAllElements(c, fn);
    }));
  }

  return inst;
};

var replaceComponentMethod = function replaceComponentMethod(Component, fn) {
  var _Object$getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(Component.prototype, 'render');

  var oldRender = _Object$getOwnPropertyDescriptor.value;

  var descriptor = _objectWithoutProperties(_Object$getOwnPropertyDescriptor, ['value']);

  Object.defineProperty(Component, 'render', _extends({}, descriptor, { value: fn(oldRender) }));
  return Component;
};

var decorateRender = function decorateRender(oldRender) {
  var instance = oldRender.call(undefined);
  applyFnToAllElements(instance, function (Component) {
    console.log(Component);
    return Component;
  });
};

var decorator = function decorator(Component) {
  replaceComponentMethod(Component, decorateRender);
  return Component;
};

exports['default'] = decorator;
module.exports = exports['default'];