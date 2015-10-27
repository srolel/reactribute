jest.dontMock('../src/index');

import React from 'react';
import reactribute from '../src/index';
import TestUtils from 'react-addons-test-utils';

@reactribute
class TestComponent extends React.Component {
	render() {
		return <div testAttribute={true}>wat</div>;
	}
}

describe('adds mixin to component at React.createElement call', () => {
	console.log('wsat')
	const element = TestUtils.renderIntoDocument(
		<TestComponent/>
	);

});


