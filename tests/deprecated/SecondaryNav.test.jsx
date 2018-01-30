import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import SecondaryNav from '../../src/components/deprecated/SecondaryNav';

describe('List', () => {
  it('does render a NavBar', () => {
    const secNavComponent = ReactTestUtils.renderIntoDocument(
      <SecondaryNav />,
    );
    expect(secNavComponent).toBeDefined();
  });

  it('does render secondary navbar with expected style', () => {
    const secNavComponent = ReactTestUtils.renderIntoDocument(
      <SecondaryNav />,
    );
    const secondaryNavNode = ReactDOM.findDOMNode(secNavComponent);
    expect(secondaryNavNode.style.display).toBe('flex');
    expect(secondaryNavNode.style.flexWrap).toBe('nowrap');
    expect(secondaryNavNode.style.height).toBe('100%');
    expect(secondaryNavNode.style.alignItems).toBe('center');
    expect(secondaryNavNode.style.padding).toBe('0px 20px');
  });

  it('does render left children', () => {
    const text = 'left text';
    const secNavComponent = ReactTestUtils.renderIntoDocument(
      <SecondaryNav leftItems={<div>{text}</div>} />,
    );
    const leftItemsNode = ReactDOM.findDOMNode(secNavComponent.leftItemsRef);
    expect(leftItemsNode.textContent).toBe(text);
    expect(leftItemsNode.style.display).toBe('flex');
    expect(leftItemsNode.style.flex).toBe('1');
  });

  it('does render right children', () => {
    const text = 'right text';
    const secNavComponent = ReactTestUtils.renderIntoDocument(
      <SecondaryNav rightItems={<div>{text}</div>} />,
    );
    const rightItemsNode = ReactDOM.findDOMNode(secNavComponent.rightItemsRef);
    expect(rightItemsNode.textContent).toBe(text);
    expect(rightItemsNode.style.display).toBe('flex');
    expect(rightItemsNode.style.flex).toBe('1');
    expect(rightItemsNode.style.justifyContent).toBe('flex-end');
  });
});
