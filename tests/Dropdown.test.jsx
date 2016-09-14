import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Dropdown from '../src/components/Dropdown';


describe('Dropdown', () => {
  function generateFakeAnchorEl() {
    return (<div style={{ width: '100px' }} />);
  }
  const fakeAnchorEl = generateFakeAnchorEl();
  const items = [
    {
      key: 'key',
      value: 'value',
    },
  ];

  it('Does render a Dropdown', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        triggerEl={fakeAnchorEl}
      />
    );
    expect(dropdownComponent).toBeDefined();
  });

  it('Does render a list of items', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        items={items}
        triggerEl={fakeAnchorEl}
      />
    );
    expect(dropdownComponent.itemsRef.listItemRefs.count()).toBe(1);
  });

  it('Does render a closed dropdown', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown triggerEl={fakeAnchorEl} />
    );
    const dropdownNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.contentRef);
    expect(dropdownNode.style.visibility).toBe('hidden');
  });

  it('Does render an opened dropdown', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        open={true}
        triggerEl={fakeAnchorEl}
      />
    );
    const dropdownNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.contentRef);
    expect(dropdownNode.style.visibility).toBe('visible');
  });

  it('Does set anchorOrigin bottom', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        anchorOrigin={'bottom'}
        triggerEl={fakeAnchorEl}
      />
    );

    const popoverNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.contentRef);
    expect(popoverNode.style.left).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateX(-50%) translateY(0px)');
  });

  it('Does set anchorOrigin top', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        triggerEl={fakeAnchorEl}
        anchorOrigin={'top'}
      />
    );

    const popoverNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.contentRef);
    expect(popoverNode.style.bottom).toEqual('0px');
  });

  it('Does set anchorOrigin right', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        triggerEl={fakeAnchorEl}
        anchorOrigin={'right'}
      />
    );

    const popoverNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.contentRef);
    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateY(-50%) translateX(0px)');
  });

  it('Does set anchorOrigin left', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        triggerEl={fakeAnchorEl}
        anchorOrigin={'left'}
      />
    );


    const popoverNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.contentRef);
    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateY(-50%) translateX(0)');
  });

  it('Does render a self closing popover', () => {
    const mockHandleRequestClose = jest.fn();
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        onRequestClose={mockHandleRequestClose}
        triggerEl={fakeAnchorEl}
        useLayerForClickAway={true}
      />
    );
    const closeLayerNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.closeLayerRef);
    TestUtils.Simulate.click(closeLayerNode);
    expect(mockHandleRequestClose).toBeCalled();
  });

  it('Does not render a self closing popover by default', () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown triggerEl={fakeAnchorEl} />
    );
    expect(dropdownComponent.popoverRef.closeLayerRef).not.toBeDefined();
  });

  it('Does trigger a click event when an item is clicked', () => {
    const mockHandleClick = jest.fn();
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown
        items={items}
        onClick={mockHandleClick}
        triggerEl={fakeAnchorEl}
      />
    );
    const listItem = ReactDOM.findDOMNode(dropdownComponent.itemsRef.listItemRefs.get(0));
    TestUtils.Simulate.click(listItem);
    expect(mockHandleClick).toBeCalledWith(items[0]);
  });
});
