import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { StructuralColors } from '../src/shared/colors';
import List from '../src/components/List';
import ListItem from '../src/components/ListItem';
import TextListItem from '../src/components/TextListItem';

describe('List', () => {
  it('Does render a List', () => {
    const listComponent = ReactTestUtils.renderIntoDocument(
      <List />,
    );
    expect(listComponent).toBeDefined();
  });

  it('Does render list children', () => {
    const text = 'howdy';
    const listComponent = ReactTestUtils.renderIntoDocument(
      <List>
        <ListItem>
          <TextListItem
            text={text}
          />
        </ListItem>
      </List>,
    );
    const textListItemNode = ReactDOM.findDOMNode(listComponent.listItemRefs.get(0).listItemRef);
    expect(textListItemNode.textContent).toBe(text);
  });

  it('Does render single list item with expected styles', () => {
    const listComponent = ReactTestUtils.renderIntoDocument(
      <List>
        <ListItem>
          <TextListItem />
        </ListItem>
      </List>,
    );
    const textListItemNode = ReactDOM.findDOMNode(listComponent.listItemRefs.get(0).listItemRef);
    expect(textListItemNode.style.borderBottom).toBe('');
  });

  it('Does render 2 item list item with expected styles', () => {
    const listComponent = ReactTestUtils.renderIntoDocument(
      <List>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
      </List>,
    );
    const firstTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(0).listItemRef);
    expect(firstTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
    const lastTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(1).listItemRef);
    expect(lastTextListItemNode.style.borderBottom).toBe('');
  });

  it('Does render 3 item list item with expected styles', () => {
    const listComponent = ReactTestUtils.renderIntoDocument(
      <List>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
      </List>,
    );
    const firstTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(0).listItemRef);
    expect(firstTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
    const secondTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(1).listItemRef);
    expect(secondTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
    const lastTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(2).listItemRef);
    expect(lastTextListItemNode.style.borderBottom).toBe('');
  });
});
