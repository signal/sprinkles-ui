import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import color from 'color';
import { NoticeColors, StructuralColors } from '../src/shared/colors';
import ListItem from '../src/components/ListItem';
import TextListItem from '../src/components/TextListItem';


describe('ListItem', () => {
  it('Does render a ListItem', () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem />
    );
    expect(listItemComponent).toBeDefined();
  });

  it('Does trigger an event when clicked', () => {
    const mockHandleClick = jest.genMockFunction();
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem onClick={mockHandleClick} />
    );
    const listItemNode = ReactDOM.findDOMNode(listItemComponent);
    TestUtils.Simulate.click(listItemNode);
    expect(mockHandleClick).toBeCalled();
  });

  it('Does set hover prop on children when hovered', () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem>
        <TextListItem />
      </ListItem>
    );
    const listItemNode = ReactDOM.findDOMNode(listItemComponent);
    TestUtils.Simulate.mouseOver(listItemNode);
    let textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.cursor).toBe('pointer');
    TestUtils.Simulate.mouseOut(listItemNode);
    textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.cursor).toBe('');
  });

  it('Does set selected prop on children when selected', () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem
        selected={true}
      >
        <TextListItem />
      </ListItem>
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(color(textListItemNode.style.background).hexString()).toBe(NoticeColors.info);
  });

  it('Does render first TextListItem', () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem
        listPosition={'first'}
      >
        <TextListItem />
      </ListItem>
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
  });

  it('Does render middle ListItem', () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem
        listPosition={'middle'}
      >
        <TextListItem />
      </ListItem>
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
  });

  it('Does render last ListItem', () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem
        listPosition={'last'}
      >
        <TextListItem />
      </ListItem>
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom).toBe('');
  });

  it('Does render a ListItem with left aligned text by default', () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem>
        <TextListItem />
      </ListItem>
    );
    const listItemButtonNode = ReactDOM.findDOMNode(listItemComponent.listItemButtonRef);
    expect(listItemButtonNode.style.textAlign).toBe('left');
  });
});
