'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _chai = require('chai');

var _reactribute = require('../reactribute.js');

var _reactribute2 = _interopRequireDefault(_reactribute);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _jsdom = require('jsdom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.window = (0, _jsdom.jsdom)().defaultView;
global.document = global.window.document;

describe('reactribute', function () {
	it('should enhance React.Component class instances with string attribute matcher', function () {

		var decorator = (0, _reactribute2.default)([{
			matcher: 'testAttribute',
			fn: function fn(_ref) {
				var type = _ref.type;
				var props = _ref.props;
				var children = _ref.children;

				return { children: 'wat' };
			}
		}]);

		var TestComponent = decorator((function (_React$Component) {
			_inherits(_class, _React$Component);

			function _class() {
				_classCallCheck(this, _class);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
			}

			_createClass(_class, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', { testAttribute: true });
				}
			}]);

			return _class;
		})(_react2.default.Component));

		var instance = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TestComponent, null));

		var node = _reactDom2.default.findDOMNode(instance);
		(0, _chai.expect)(node.innerHTML).to.equal('wat');
		(0, _chai.expect)(node.tagName).to.equal('DIV');
	});

	it('should enhance React.Component class instances with string attribute matcher', function () {

		var decorator = (0, _reactribute2.default)([{
			matcher: 'style',
			fn: function fn(_ref2) {
				var _Object;

				var type = _ref2.type;
				var props = _ref2.props;
				var children = _ref2.children;

				return { props: { style: (_Object = Object).assign.apply(_Object, [{}].concat(_toConsumableArray(props.style))) } };
			}
		}]);

		var TestComponent = decorator((function (_React$Component2) {
			_inherits(_class2, _React$Component2);

			function _class2() {
				_classCallCheck(this, _class2);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
			}

			_createClass(_class2, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', { style: [{ color: 'red' }, { color: 'blue' }] });
				}
			}]);

			return _class2;
		})(_react2.default.Component));

		var instance = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TestComponent, null));

		var node = _reactDom2.default.findDOMNode(instance);

		(0, _chai.expect)(node.style.color).to.equal('blue');
		(0, _chai.expect)(node.tagName).to.equal('DIV');
	});

	it('should not change the element if false or undefined is returned', function () {

		var decorator = (0, _reactribute2.default)([{
			matcher: 'div',
			fn: function fn(_ref3) {
				var type = _ref3.type;
				var props = _ref3.props;
				var children = _ref3.children;

				return false;
			}
		}]);

		var TestComponent = decorator((function (_React$Component3) {
			_inherits(_class3, _React$Component3);

			function _class3() {
				_classCallCheck(this, _class3);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).apply(this, arguments));
			}

			_createClass(_class3, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', null);
				}
			}]);

			return _class3;
		})(_react2.default.Component));

		var instance = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TestComponent, null));

		var node = _reactDom2.default.findDOMNode(instance);

		(0, _chai.expect)(node.tagName).to.equal('DIV');
	});

	it('should not render the element if null is returned', function () {

		var decorator = (0, _reactribute2.default)([{
			matcher: 'div',
			fn: function fn(_ref4) {
				var type = _ref4.type;
				var props = _ref4.props;
				var children = _ref4.children;

				return null;
			}
		}]);

		var TestComponent = decorator((function (_React$Component4) {
			_inherits(_class4, _React$Component4);

			function _class4() {
				_classCallCheck(this, _class4);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_class4).apply(this, arguments));
			}

			_createClass(_class4, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', null);
				}
			}]);

			return _class4;
		})(_react2.default.Component));

		var instance = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TestComponent, null));
		var node = _reactDom2.default.findDOMNode(instance);
		(0, _chai.expect)(node).to.be.null;
	});

	it('should change the type of the instance', function () {

		var decorator = (0, _reactribute2.default)([{
			matcher: 'div',
			fn: function fn(_ref5) {
				var type = _ref5.type;
				var props = _ref5.props;
				var children = _ref5.children;

				return { type: 'span' };
			}
		}]);

		var TestComponent = decorator((function (_React$Component5) {
			_inherits(_class5, _React$Component5);

			function _class5() {
				_classCallCheck(this, _class5);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_class5).apply(this, arguments));
			}

			_createClass(_class5, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', null);
				}
			}]);

			return _class5;
		})(_react2.default.Component));

		var instance = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TestComponent, null));
		var node = _reactDom2.default.findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('SPAN');
	});

	it('should change the children of the instance via the children property', function () {

		var decorator = (0, _reactribute2.default)([{
			matcher: 'div',
			fn: function fn(_ref6) {
				var type = _ref6.type;
				var props = _ref6.props;
				var children = _ref6.children;

				return { children: 'wat' };
			}
		}]);

		var TestComponent = decorator((function (_React$Component6) {
			_inherits(_class6, _React$Component6);

			function _class6() {
				_classCallCheck(this, _class6);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_class6).apply(this, arguments));
			}

			_createClass(_class6, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', null);
				}
			}]);

			return _class6;
		})(_react2.default.Component));

		var instance = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TestComponent, null));
		var node = _reactDom2.default.findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.innerHTML).to.equal('wat');
	});

	it('should change the children of the instance via the props property', function () {

		var decorator = (0, _reactribute2.default)([{
			matcher: 'div',
			fn: function fn(_ref7) {
				var type = _ref7.type;
				var props = _ref7.props;
				var children = _ref7.children;

				return { props: { children: 'wat' } };
			}
		}]);

		var TestComponent = decorator((function (_React$Component7) {
			_inherits(_class7, _React$Component7);

			function _class7() {
				_classCallCheck(this, _class7);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_class7).apply(this, arguments));
			}

			_createClass(_class7, [{
				key: 'render',
				value: function render() {
					return _react2.default.createElement('div', null);
				}
			}]);

			return _class7;
		})(_react2.default.Component));

		var instance = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(TestComponent, null));
		var node = _reactDom2.default.findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.innerHTML).to.equal('wat');
	});
});