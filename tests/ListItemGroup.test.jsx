import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { StructuralColors } from '../src/shared/colors';
import ListItemGroup from '../src/components/ListItemGroup';
import TextListItem from '../src/components/TextListItem';
import ListItem from '../src/components/ListItem';

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

  it('Does render single list item with expected styles', () => {
    const ligComponent = TestUtils.renderIntoDocument(
      <ListItemGroup>
        <ListItem>
          <TextListItem />
        </ListItem>
      </ListItemGroup>
    );
    const textListItemNode = ReactDOM.findDOMNode(ligComponent.listItemRefs.get(0).listItemRef);
    expect(textListItemNode.style.borderBottom).toBe('');
  });

  it('Does render 2 item list item with expected styles', () => {
    const ligComponent = TestUtils.renderIntoDocument(
      <ListItemGroup>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
      </ListItemGroup>
    );
    const firstTextListItemNode = ReactDOM
      .findDOMNode(ligComponent.listItemRefs.get(0).listItemRef);
    expect(firstTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
    const lastTextListItemNode = ReactDOM
      .findDOMNode(ligComponent.listItemRefs.get(1).listItemRef);
    expect(lastTextListItemNode.style.borderBottom).toBe('');
  });

  it('Does render 3 item list item with expected styles', () => {
    const ligComponent = TestUtils.renderIntoDocument(
      <ListItemGroup>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
      </ListItemGroup>
    );
    const firstTextListItemNode = ReactDOM
      .findDOMNode(ligComponent.listItemRefs.get(0).listItemRef);
    expect(firstTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
    const secondTextListItemNode = ReactDOM
      .findDOMNode(ligComponent.listItemRefs.get(1).listItemRef);
    expect(secondTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
    const lastTextListItemNode = ReactDOM
      .findDOMNode(ligComponent.listItemRefs.get(2).listItemRef);
    expect(lastTextListItemNode.style.borderBottom).toBe('');
  });
});
