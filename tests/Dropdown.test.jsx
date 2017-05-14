import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Dropdown from '../src/components/Dropdown';

let anchorElNode;
let dropdownComponent;
let dropdownNode;
let popoverNode;

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
const defaultProps = {
  items,
  triggerEl: fakeAnchorEl,
};
const renderDropDown = (props) => {
  dropdownComponent = ReactTestUtils.renderIntoDocument(
    <Dropdown
      {...defaultProps}
      {...props}
    />,
  );
  dropdownNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.contentRef);
  popoverNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.contentRef);
  anchorElNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.triggerElRef);
};

describe('Dropdown', () => {
  beforeEach(() => {
    renderDropDown();
  });

  it('Does render a Dropdown', () => {
    expect(dropdownComponent).toBeDefined();
  });

  it('Does render a list of items', () => {
    expect(dropdownComponent.itemsRef.listItemRefs.count()).toBe(1);
  });

  it('Does render a closed dropdown', () => {
    expect(dropdownNode.style.visibility).toBe('hidden');
  });

  it('Does render an opened dropdown', () => {
    renderDropDown({
      open: true,
    });
    expect(dropdownNode.style.visibility).toBe('visible');
  });

  it('Does set anchorOrigin bottom', () => {
    renderDropDown({
      anchorOrigin: 'bottom',
    });

    expect(popoverNode.style.left).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateX(-50%) translateY(0px)');
  });

  it('Does set anchorOrigin top', () => {
    renderDropDown({
      anchorOrigin: 'top',
    });

    expect(popoverNode.style.bottom).toEqual('0px');
  });

  it('Does set anchorOrigin right', () => {
    renderDropDown({
      anchorOrigin: 'right',
    });

    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateY(-50%) translateX(0px)');
  });

  it('Does set anchorOrigin left', () => {
    renderDropDown({
      anchorOrigin: 'left',
    });

    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateY(-50%) translateX(0)');
  });

  it('Does render a self closing popover', () => {
    const mockHandleRequestClose = jest.fn();
    renderDropDown({
      anchorOrigin: 'bottom',
      onRequestClose: mockHandleRequestClose,
      useLayerForClickAway: true,
    });
    const closeLayerNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef.closeLayerRef);
    ReactTestUtils.Simulate.click(closeLayerNode);
    expect(mockHandleRequestClose).toBeCalled();
  });

  it('Does not render a self closing popover by default', () => {
    expect(dropdownComponent.popoverRef.closeLayerRef).not.toBeDefined();
  });

  it('Does trigger a click event when an item is clicked', () => {
    const mockHandleClick = jest.fn();
    renderDropDown({
      onClick: mockHandleClick,
    });
    const listItem = ReactDOM.findDOMNode(dropdownComponent.itemsRef.listItemRefs.get(0));
    ReactTestUtils.Simulate.click(listItem);
    expect(mockHandleClick).toBeCalledWith(items[0]);
  });

  it('Does trigger a request open event when the anchor is clicked for a dropdown', () => {
    const mockOnRequestOpen = jest.fn();
    renderDropDown({
      onRequestOpen: mockOnRequestOpen,
    });

    ReactTestUtils.Simulate.click(anchorElNode);
    expect(mockOnRequestOpen).toBeCalled();
  });

  it('Does not trigger a request open event when the anchor is clicked for a disabled dropdown', () => {
    const mockOnRequestOpen = jest.fn();
    renderDropDown({
      disabled: true,
      onRequestOpen: mockOnRequestOpen,
      triggerEl: fakeAnchorEl,
    });

    ReactTestUtils.Simulate.click(anchorElNode);
    expect(mockOnRequestOpen).not.toBeCalled();
  });
});
