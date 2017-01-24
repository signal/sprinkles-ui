import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Menu from '../src/components/Menu';

describe('Menu', () => {
  it('Does render a Menu', () => {
    const menuComponent = TestUtils.renderIntoDocument(
      <Menu
        triggerEl={<div>Test</div>}
      />
    );
    expect(menuComponent).toBeDefined();
  });
  it('Does toggle a Menu open when trigger is clicked', () => {
    const menuComponent = TestUtils.renderIntoDocument(
      <Menu
        triggerEl={<a>Test</a>}
      />
    );
    const menuNode = ReactDOM.findDOMNode(menuComponent);
    const triggerEl = menuNode.getElementsByTagName('a')[0];
    TestUtils.Simulate.click(triggerEl);
    expect(menuComponent.state.open).toEqual(true);
  });
});
