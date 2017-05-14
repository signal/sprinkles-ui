import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import color from 'color';
import { NoticeColors, StructuralColors } from '../src/shared/colors';
import ListItem from '../src/components/ListItem';
import TextListItem from '../src/components/TextListItem';


describe('ListItem', () => {
  it('Does render a ListItem', () => {
    const listItemComponent = ReactTestUtils.renderIntoDocument(
      <ListItem />,
    );
    expect(listItemComponent).toBeDefined();
  });

  it('Does trigger an event when clicked', () => {
    const mockHandleClick = jest.genMockFunction();
    const listItemComponent = ReactTestUtils.renderIntoDocument(
      <ListItem onClick={mockHandleClick} />,
    );
    const listItemNode = ReactDOM.findDOMNode(listItemComponent);
    ReactTestUtils.Simulate.click(listItemNode);
    expect(mockHandleClick).toBeCalled();
  });

  it('Does set hover prop on children when hovered', () => {
    const listItemComponent = ReactTestUtils.renderIntoDocument(
      <ListItem>
        <TextListItem />
      </ListItem>,
    );
    const listItemNode = ReactDOM.findDOMNode(listItemComponent);
    ReactTestUtils.Simulate.mouseOver(listItemNode);
    let textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.cursor).toBe('pointer');
    ReactTestUtils.Simulate.mouseOut(listItemNode);
    textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.cursor).toBe('');
  });

  it('Does set selected prop on children when selected', () => {
    const listItemComponent = ReactTestUtils.renderIntoDocument(
      <ListItem
        selected={true}
      >
        <TextListItem />
      </ListItem>,
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(color(textListItemNode.style.background).hexString()).toBe(NoticeColors.info);
  });

  it('Does render first TextListItem', () => {
    const listItemComponent = ReactTestUtils.renderIntoDocument(
      <ListItem
        listPosition={'first'}
      >
        <TextListItem />
      </ListItem>,
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
  });

  it('Does render middle ListItem', () => {
    const listItemComponent = ReactTestUtils.renderIntoDocument(
      <ListItem
        listPosition={'middle'}
      >
        <TextListItem />
      </ListItem>,
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
  });

  it('Does render last ListItem', () => {
    const listItemComponent = ReactTestUtils.renderIntoDocument(
      <ListItem
        listPosition={'last'}
      >
        <TextListItem />
      </ListItem>,
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom).toBe('');
  });

  it('Does render a ListItem with left aligned text by default', () => {
    const listItemComponent = ReactTestUtils.renderIntoDocument(
      <ListItem>
        <TextListItem />
      </ListItem>,
    );
    const listItemButtonNode = ReactDOM.findDOMNode(listItemComponent.listItemButtonRef);
    expect(listItemButtonNode.style.textAlign).toBe('left');
  });
});
