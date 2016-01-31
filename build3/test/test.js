'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var _chai = require('chai');

var _indexJs = require('../index.js');

var _indexJs2 = _interopRequireDefault(_indexJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _jsdom = require('jsdom');

global.window = (0, _jsdom.jsdom)().defaultView;
global.document = global.window.document;

describe('reactribute', function () {
	it('should enhance React.Component class instances with string attribute matcher', function () {

		var decorator = (0, _indexJs2['default'])([{
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

				_React$Component.apply(this, arguments);
			}

			_class.prototype.render = function render() {
				return _react2['default'].createElement('div', { testAttribute: true });
			};

			return _class;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));

		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.innerHTML).to.equal('wat');
		(0, _chai.expect)(node.tagName).to.equal('DIV');
	});

	it('should enhance React.Component class instances with string attribute matcher', function () {

		var decorator = (0, _indexJs2['default'])([{
			matcher: 'style',
			fn: function fn(_ref2) {
				var type = _ref2.type;
				var props = _ref2.props;
				var children = _ref2.children;

				return { props: { style: Object.assign.apply(Object, [{}].concat(_toConsumableArray(props.style))) } };
			}
		}]);

		var TestComponent = decorator((function (_React$Component2) {
			_inherits(_class2, _React$Component2);

			function _class2() {
				_classCallCheck(this, _class2);

				_React$Component2.apply(this, arguments);
			}

			_class2.prototype.render = function render() {
				return _react2['default'].createElement('div', { style: [{ color: 'red' }, { color: 'blue' }] });
			};

			return _class2;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));

		var node = _reactDom2['default'].findDOMNode(instance);

		(0, _chai.expect)(node.style.color).to.equal('blue');
		(0, _chai.expect)(node.tagName).to.equal('DIV');
	});

	it('should enhance React.Component class instances with string key matcher', function () {

		var decorator = (0, _indexJs2['default'])([{
			matcher: 'test',
			fn: function fn(_ref3) {
				var type = _ref3.type;
				var props = _ref3.props;
				var children = _ref3.children;

				return { props: { style: Object.assign.apply(Object, [{}].concat(_toConsumableArray(props.style))) } };
			}
		}]);

		var TestComponent = decorator((function (_React$Component3) {
			_inherits(_class3, _React$Component3);

			function _class3() {
				_classCallCheck(this, _class3);

				_React$Component3.apply(this, arguments);
			}

			_class3.prototype.render = function render() {
				return _react2['default'].createElement('div', { key: 'test', style: [{ color: 'red' }, { color: 'blue' }] });
			};

			return _class3;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));

		var node = _reactDom2['default'].findDOMNode(instance);

		(0, _chai.expect)(node.style.color).to.equal('blue');
		(0, _chai.expect)(node.tagName).to.equal('DIV');
	});

	it('should not change the element if false or undefined is returned', function () {

		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref4) {
				var type = _ref4.type;
				var props = _ref4.props;
				var children = _ref4.children;

				return false;
			}
		}]);

		var TestComponent = decorator((function (_React$Component4) {
			_inherits(_class4, _React$Component4);

			function _class4() {
				_classCallCheck(this, _class4);

				_React$Component4.apply(this, arguments);
			}

			_class4.prototype.render = function render() {
				return _react2['default'].createElement('div', null);
			};

			return _class4;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));

		var node = _reactDom2['default'].findDOMNode(instance);

		(0, _chai.expect)(node.tagName).to.equal('DIV');
	});

	it('should not render the element if null is returned', function () {

		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref5) {
				var type = _ref5.type;
				var props = _ref5.props;
				var children = _ref5.children;

				return null;
			}
		}]);

		var TestComponent = decorator((function (_React$Component5) {
			_inherits(_class5, _React$Component5);

			function _class5() {
				_classCallCheck(this, _class5);

				_React$Component5.apply(this, arguments);
			}

			_class5.prototype.render = function render() {
				return _react2['default'].createElement('div', null);
			};

			return _class5;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node).to.be['null'];
	});

	it('should change the type of the instance', function () {

		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref6) {
				var type = _ref6.type;
				var props = _ref6.props;
				var children = _ref6.children;

				return { type: 'span' };
			}
		}]);

		var TestComponent = decorator((function (_React$Component6) {
			_inherits(_class6, _React$Component6);

			function _class6() {
				_classCallCheck(this, _class6);

				_React$Component6.apply(this, arguments);
			}

			_class6.prototype.render = function render() {
				return _react2['default'].createElement('div', null);
			};

			return _class6;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('SPAN');
	});

	it('should change the children of the instance via the children property', function () {

		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref7) {
				var type = _ref7.type;
				var props = _ref7.props;
				var children = _ref7.children;

				return { children: 'wat' };
			}
		}]);

		var TestComponent = decorator((function (_React$Component7) {
			_inherits(_class7, _React$Component7);

			function _class7() {
				_classCallCheck(this, _class7);

				_React$Component7.apply(this, arguments);
			}

			_class7.prototype.render = function render() {
				return _react2['default'].createElement('div', null);
			};

			return _class7;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.innerHTML).to.equal('wat');
	});

	it('should change the children of the instance via the props property', function () {

		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref8) {
				var type = _ref8.type;
				var props = _ref8.props;
				var children = _ref8.children;

				return { props: { children: 'wat' } };
			}
		}]);

		var TestComponent = decorator((function (_React$Component8) {
			_inherits(_class8, _React$Component8);

			function _class8() {
				_classCallCheck(this, _class8);

				_React$Component8.apply(this, arguments);
			}

			_class8.prototype.render = function render() {
				return _react2['default'].createElement('div', null);
			};

			return _class8;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.innerHTML).to.equal('wat');
	});

	it('should be composable with itself', function () {
		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref9) {
				var type = _ref9.type;
				var props = _ref9.props;
				var children = _ref9.children;

				return { props: { children: 'wat' } };
			}
		}]);

		// note: settings {props: {children: 'wat'}} won't work because the previous decorator set the `children` prop (not inside `props`) which takes precedence
		var anotherDecorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref10) {
				var type = _ref10.type;
				var props = _ref10.props;
				var children = _ref10.children;

				return { children: 'lol' };
			}
		}]);

		var TestComponent = anotherDecorator(decorator((function (_React$Component9) {
			_inherits(_class9, _React$Component9);

			function _class9() {
				_classCallCheck(this, _class9);

				_React$Component9.apply(this, arguments);
			}

			_class9.prototype.render = function render() {
				return _react2['default'].createElement('div', null);
			};

			return _class9;
		})(_react2['default'].Component)));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.innerHTML).to.equal('lol');
	});

	it('should be composable with itself and keep keys', function () {
		var decorator = (0, _indexJs2['default'])([{
			matcher: 'wat',
			fn: function fn(_ref11) {
				var type = _ref11.type;
				var props = _ref11.props;
				var children = _ref11.children;

				return { props: { children: 'wat' } };
			}
		}]);

		// note: settings {props: {children: 'wat'}} won't work because the previous decorator set the `children` prop (not inside `props`) which takes precedence
		var anotherDecorator = (0, _indexJs2['default'])([{
			matcher: 'wat',
			fn: function fn(_ref12) {
				var type = _ref12.type;
				var props = _ref12.props;
				var children = _ref12.children;

				return { children: 'lol' };
			}
		}]);

		var TestComponent = anotherDecorator(decorator((function (_React$Component10) {
			_inherits(_class10, _React$Component10);

			function _class10() {
				_classCallCheck(this, _class10);

				_React$Component10.apply(this, arguments);
			}

			_class10.prototype.render = function render() {
				return _react2['default'].createElement('div', { key: 'wat' });
			};

			return _class10;
		})(_react2['default'].Component)));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.innerHTML).to.equal('lol');
	});

	it('should work with refs', function () {
		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref13) {
				var type = _ref13.type;
				var props = _ref13.props;
				var children = _ref13.children;

				return { props: { children: 'wat' } };
			}
		}]);

		var TestComponent = decorator((function (_React$Component11) {
			_inherits(_class11, _React$Component11);

			function _class11() {
				_classCallCheck(this, _class11);

				_React$Component11.apply(this, arguments);
			}

			_class11.prototype.render = function render() {
				return _react2['default'].createElement('div', { ref: 'wat' });
			};

			return _class11;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(instance.refs).to.have.all.keys('wat');
		(0, _chai.expect)(instance.refs.wat).to.equal(node);
	});

	it('should apply multiple attributes', function () {
		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref14) {
				var type = _ref14.type;
				var props = _ref14.props;
				var children = _ref14.children;

				return { props: { children: 'wat' } };
			}
		}, {
			matcher: 'wat',
			fn: function fn(_ref15) {
				var type = _ref15.type;
				var props = _ref15.props;
				var children = _ref15.children;

				return { props: { style: { color: 'red' } } };
			}
		}]);

		var TestComponent = decorator((function (_React$Component12) {
			_inherits(_class12, _React$Component12);

			function _class12() {
				_classCallCheck(this, _class12);

				_React$Component12.apply(this, arguments);
			}

			_class12.prototype.render = function render() {
				return _react2['default'].createElement('div', { key: 'wat' });
			};

			return _class12;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.innerHTML).to.equal('wat');
		(0, _chai.expect)(node.style.color).to.equal('red');
	});

	it('should apply multiple attributes to the same prop', function () {
		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref16) {
				var type = _ref16.type;
				var props = _ref16.props;
				var children = _ref16.children;

				return { props: { className: 'wat' } };
			}
		}, {
			matcher: 'wat',
			fn: function fn(_ref17) {
				var type = _ref17.type;
				var props = _ref17.props;
				var children = _ref17.children;

				return { props: { className: props.className + ' lol' } };
			}
		}]);

		var TestComponent = decorator((function (_React$Component13) {
			_inherits(_class13, _React$Component13);

			function _class13() {
				_classCallCheck(this, _class13);

				_React$Component13.apply(this, arguments);
			}

			_class13.prototype.render = function render() {
				return _react2['default'].createElement('div', { key: 'wat' });
			};

			return _class13;
		})(_react2['default'].Component));

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.className).to.equal('wat lol');
	});

	it('should apply attributes deeply', function () {

		var decorator = (0, _indexJs2['default'])([{
			matcher: 'div',
			fn: function fn(_ref18) {
				var type = _ref18.type;
				var props = _ref18.props;
				var children = _ref18.children;

				return { props: { children: 'wat' } };
			}
		}, {
			matcher: 'wat',
			fn: function fn(_ref19) {
				var type = _ref19.type;
				var props = _ref19.props;
				var children = _ref19.children;

				return { props: { style: { color: 'red' } } };
			}
		}], { deep: true });

		var TestComponent = decorator((function (_React$Component14) {
			_inherits(_class14, _React$Component14);

			function _class14() {
				_classCallCheck(this, _class14);

				_React$Component14.apply(this, arguments);
			}

			_class14.prototype.render = function render() {
				return _react2['default'].createElement(AnotherTestComponent, null);
			};

			return _class14;
		})(_react2['default'].Component));

		var AnotherTestComponent = (function (_React$Component15) {
			_inherits(AnotherTestComponent, _React$Component15);

			function AnotherTestComponent() {
				_classCallCheck(this, AnotherTestComponent);

				_React$Component15.apply(this, arguments);
			}

			AnotherTestComponent.prototype.render = function render() {
				return _react2['default'].createElement('div', { key: 'wat' });
			};

			return AnotherTestComponent;
		})(_react2['default'].Component);

		var instance = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(TestComponent, null));
		var node = _reactDom2['default'].findDOMNode(instance);
		(0, _chai.expect)(node.tagName).to.equal('DIV');
		(0, _chai.expect)(node.innerHTML).to.equal('wat');
		(0, _chai.expect)(node.style.color).to.equal('red');
	});

	// it('should apply attributes deeply to pure components', () => {

	// 	const decorator = reactribute([{
	// 		matcher: 'div',
	// 		fn({type, props, children}) {
	// 			return {props: {children: 'wat'}};
	// 		}
	// 	}, {
	// 		matcher: 'wat',
	// 		fn({type, props, children}) {
	// 			return {props: {style: {color: 'red'}}};
	// 		}
	// 	}], {deep: true});

	// 	const TestComponent = () => console.log('testcomponent')||<div key="wat"/>;
	// 	const AnotherTestComponent = decorator(() => <TestComponent/>);
	// 	const instance = ReactDOMServer.renderToString(<AnotherTestComponent/>);

	// });
});