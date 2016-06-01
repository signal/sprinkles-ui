jest.dontMock('../src/components/ListItemGroup');
jest.dontMock('../src/components/Text');
jest.dontMock('../src/components/ListItem');
jest.dontMock('../src/components/TextListItem');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// TODO: move this to es6 style import when its implemented in jest
const ListItemGroup = require('../src/components/ListItemGroup').default;
const TextListItem = require('../src/components/TextListItem').default;
const ListItem = require('../src/components/ListItem').default;

describe('ListItemGroup', () => {
  const renderComponent = (props) => (
    TestUtils.renderIntoDocument(
      <ListItemGroup {...props} />
    )
  );
  it('does exist', () => {
    const ligComponent = renderComponent();
    expect(ligComponent)
      .toBeDefined();
  });

  it('does render a group label', () => {
    const label = 'Group';
    const ligComponent = renderComponent({
      label,
    });
    const groupLabelNode = ReactDOM.findDOMNode(ligComponent.labelRef);
    expect(groupLabelNode.textContent)
      .toBe(label);
  });

  it('does render a group children', () => {
    const label = 'Group';
    const text = 'text';
    const ligComponent = renderComponent({
      label,
      children:
        <ListItem>
          <TextListItem
            text={text}
          />
        </ListItem>,
    });
    const textListItemNode = ReactDOM.findDOMNode(ligComponent.listItemRefs.get(0).listItemRef);
    expect(textListItemNode.textContent).toBe(text);
  });
});
