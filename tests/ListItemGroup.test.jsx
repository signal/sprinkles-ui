jest.dontMock('../src/components/ListItemGroup');
jest.dontMock('../src/components/Text');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// TODO: move this to es6 style import when its implemented in jest
const ListItemGroup = require('../src/components/ListItemGroup').default;


describe('ListItemGroup', () => {
  const renderComponent = (props) => (
    TestUtils.renderIntoDocument(
      <ListItemGroup {...props} />
    )
  );
  it('Does exist', () => {
    const ligComponent = renderComponent();
    expect(ligComponent)
      .toBeDefined();
  });

  it('Does render a group label', () => {
    const label = 'Group';
    const ligComponent = renderComponent({
      label,
    });
    const groupLabelNode = ReactDOM.findDOMNode(ligComponent.labelRef);
    expect(groupLabelNode.textContent)
      .toBe(label);
  });
});
