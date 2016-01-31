'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsJs = require('./utils.js');

var applyFnToAllElements = function applyFnToAllElements(inst, fn) {
  if (!_react2['default'].isValidElement(inst)) {
    return inst;
  }

  var result = fn({
    type: inst.type,
    key: inst.key,
    ref: inst.ref,
    props: inst.props,
    children: inst.props.children
  });

  if (result === false || typeof result === 'undefined') {
    return inst;
  }

  if (result === null) {
    return null;
  }

  var _resolveElementParams = (0, _utilsJs.resolveElementParams)(inst, result);

  var type = _resolveElementParams.type;
  var props = _resolveElementParams.props;
  var children = _resolveElementParams.children;
  var key = _resolveElementParams.key;
  var ref = _resolveElementParams.ref;

  // https://github.com/facebook/react/issues/5519
  key = key === null ? undefined : key;

  if (children && children.map) {
    props.children = (0, _utilsJs.flatten)(children).map(function (c) {
      return applyFnToAllElements(c, fn);
    });
  } else if (children) {
    props.children = applyFnToAllElements(children, fn);
  }

  return {
    $$typeof: inst.$$typeof,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: inst._owner
  };
};

var enhanceReactClassComponent = function enhanceReactClassComponent(Component, fn) {
  var render = Component.prototype.render;

  var newComponent = (function (_Component) {
    _inherits(newComponent, _Component);

    function newComponent() {
      _classCallCheck(this, newComponent);

      _Component.apply(this, arguments);
    }

    return newComponent;
  })(Component);
  newComponent.displayName = Component.displayName || Component.name;
  newComponent.prototype.render = fn(render);
  return newComponent;
};

var enhanceReactPureComponent = function enhanceReactPureComponent(Component, fn) {
  return fn(Component);
};

var decorateRender = function decorateRender(fn) {
  return function (oldRender) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var instance = oldRender.apply(this, args);
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

exports['default'] = enhanceInstances;
module.exports = exports['default'];