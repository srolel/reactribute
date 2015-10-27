
import React from 'react';
import reactribute from './index';
import TestUtils from 'react-addons-test-utils';

@reactribute
class TestComponent extends React.Component {
	render() {
		return <div testAttribute={true}>wat</div>;
	}
}

const element = TestUtils.renderIntoDocument(
	<TestComponent/>
);
