// don't mock our CUT or components it depends on
jest.dontMock('../src/components/TextListItem');
jest.dontMock('../src/components/Text');
jest.dontMock('../src/shared/colors');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import color from 'color';
import {
  BackgroundColors,
  Colors,
  TextColors,
  StructuralColors,
} from '../src/shared/colors';

// TODO: move this to es6 style import when its implemented in jest
const TextListItem = require('../src/components/TextListItem').default;


describe('TextListItem', () => {
  it('Does render a TextListItem', () => {
    // Render a ListItem with no style
    const textListItemComponent = TestUtils.renderIntoDocument(
        <TextListItem />
    );
    expect(textListItemComponent).toBeDefined();
  });

  it('Does render a TextListItem text', () => {
    const text = 'howdy';
    const textListItemComponent = TestUtils.renderIntoDocument(
        <TextListItem text={text} />
    );
    const textListItemNode = ReactDOM.findDOMNode(textListItemComponent);
    expect(textListItemNode.textContent).toBe(text);
  });

  it('Does render a selected TextListItem', () => {
    const textListItemComponent = TestUtils.renderIntoDocument(
        <TextListItem
          selected={true}
        />
    );
    const textListItemNode = ReactDOM.findDOMNode(textListItemComponent);
    expect(color(textListItemNode.style.backgroundColor).hexString()).toBe(Colors.info);
    expect(color(textListItemNode.style.color).hexString()).toBe(TextColors.light);
  });

  it('Does render a hovered TextListItem', () => {
    const textListItemComponent = TestUtils.renderIntoDocument(
        <TextListItem
          hovered={true}
        />
    );
    const textListItemNode = ReactDOM.findDOMNode(textListItemComponent);
    expect(color(textListItemNode.style.backgroundColor).hexString())
      .toBe(BackgroundColors.accent);
    expect(color(textListItemNode.style.color).hexString()).toBe(TextColors.accent);
  });

  it('Does render first TextListItem', () => {
    const textListItemComponent = TestUtils.renderIntoDocument(
        <TextListItem
          listPosition={'first'}
        />
    );
    const textListItemNode = ReactDOM.findDOMNode(textListItemComponent);
    expect(textListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
  });

  it('Does render middle TextListItem', () => {
    const textListItemComponent = TestUtils.renderIntoDocument(
        <TextListItem
          listPosition={'middle'}
        />
    );
    const textListItemNode = ReactDOM.findDOMNode(textListItemComponent);
    expect(textListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
  });

  it('Does render last TextListItem', () => {
    const textListItemComponent = TestUtils.renderIntoDocument(
        <TextListItem
          listPosition={'last'}
        />
    );
    const textListItemNode = ReactDOM.findDOMNode(textListItemComponent);
    expect(textListItemNode.style.borderBottom).toBe('');
  });

  it('Does trigger onClick when clicked', () => {
    const mockHandleClick = jest.fn();
    const textListItemComponent = TestUtils.renderIntoDocument(
      <TextListItem onClick={mockHandleClick} />
    );
    const textListItemNode = ReactDOM.findDOMNode(textListItemComponent);
    TestUtils.Simulate.click(textListItemNode);
    expect(mockHandleClick).toBeCalled();
  });

  it('Does render a disabled TextListItem', () => {
    const textListItemComponent = TestUtils.renderIntoDocument(
      <TextListItem
        enabled={false}
      />
    );
    const textListItemNode = ReactDOM.findDOMNode(textListItemComponent);
    expect(color(textListItemNode.style.color).hexString()).toBe(TextColors.secondary);
    expect(color(textListItemNode.style.background).hexString()).toBe(BackgroundColors.secondary);
    expect(textListItemNode.style.cursor).toBe('not-allowed');
  });
});
