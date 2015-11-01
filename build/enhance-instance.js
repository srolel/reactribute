'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveElementParams = function resolveElementParams(originalInstance, transformationResult) {
  var type = transformationResult.type;
  var props = transformationResult.props;
  var children = transformationResult.children;

  props = props ? (0, _utils.extend)(originalInstance.props, props) : originalInstance.props;
  children = children || props && props.children;
  type = type || originalInstance.type;

  return { type: type, props: props, children: children };
};

var applyFnToAllElements = function applyFnToAllElements(inst, fn) {

  if (!_react2.default.isValidElement(inst)) {
    return inst;
  }

  var result = fn({ type: inst.type, props: inst.props, children: inst.props.children });

  if (result === false || typeof result === 'undefined') {
    return inst;
  }

  if (result === null) {
    return null;
  }

  var _resolveElementParams = resolveElementParams(inst, result);

  var type = _resolveElementParams.type;
  var props = _resolveElementParams.props;
  var children = _resolveElementParams.children;

  var resolveChildren = (0, _utils.cond)([function (x) {
    return Array.isArray(x);
  }, function (x) {
    return _react2.default.Children.map(x, function (c) {
      return applyFnToAllElements(c, fn);
    });
  }], [function (x) {
    return x;
  }, function (x) {
    return applyFnToAllElements(x, fn);
  }], function (x) {
    return x;
  });

  children = resolveChildren(children);
  inst = _react2.default.createElement(type, props, children);
  return inst;
};

var enhanceReactClassComponent = function enhanceReactClassComponent(Component, fn) {
  var descriptor = Object.getOwnPropertyDescriptor(Component.prototype, 'render');
  Object.defineProperty(Component.prototype, 'render', (0, _utils.extend)(descriptor, { value: fn(descriptor.render) }));
  return Component;
};

var enhanceReactPureComponent = function enhanceReactPureComponent(Component, fn) {
  return fn(Component);
};

var decorateRender = function decorateRender(fn) {
  return function (oldRender) {
    return function () {
      var instance = oldRender.call(undefined);
      var decorated = applyFnToAllElements(instance, fn);
      return decorated;
    };
  };
};

var enhanceInstances = function enhanceInstances(fn) {
  return function (Component) {
    var decoratedRender = decorateRender(fn);
    var enhancer = Component.prototype.hasOwnProperty('render') ? enhanceReactClassComponent : enhanceReactPureComponent;

    return enhancer(Component, decoratedRender);
  };
};

exports.default = enhanceInstances;