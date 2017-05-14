import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Popover from '../src/components/Popover';


describe('Popover', () => {
  function generateFakeAnchorEl() {
    return (<div />);
  }
  const fakeAnchorEl = generateFakeAnchorEl();

  it('Does render a Popover', () => {
    const text = 'howdy';
    // Render a Popover
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        defaultOpen={true}
        triggerEl={fakeAnchorEl}
      >{text}
      </Popover>,
    );
    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    // Verify that it's rendered with the right text
    expect(popoverNode.textContent).toEqual(text);
  });

  it('Does render an open Popover', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        open={true}
        triggerEl={fakeAnchorEl}
      />,
    );
    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.visibility).toEqual('visible');
  });

  it('Does render a closed Popover', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover triggerEl={fakeAnchorEl} />,
    );
    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.visibility).toEqual('hidden');
  });

  it('Does set anchorOrigin left', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'left'}
        triggerEl={fakeAnchorEl}
      />,
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateY(-50%) translateX(0)');
  });

  it('Does set anchorOrigin left width content width', () => {
    const contentWidth = 250;
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'left'}
        triggerEl={fakeAnchorEl}
        contentWidth={contentWidth}
      />,
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual(`translateY(-50%) translateX(-${contentWidth / 2}px)`);
  });

  it('Does set anchorOrigin right', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'right'}
        triggerEl={fakeAnchorEl}
      />,
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateY(-50%) translateX(0px)');
  });

  it('Does set anchorOrigin right content width', () => {
    const contentWidth = 250;
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'right'}
        triggerEl={fakeAnchorEl}
        contentWidth={contentWidth}
      />,
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual(`translateY(-50%) translateX(${contentWidth / 2}px)`);
  });

  it('Does set anchorOrigin top', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'top'}
        triggerEl={fakeAnchorEl}
      />,
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.bottom).toEqual('0px');
  });

  it('Does set anchorOrigin bottom', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'bottom'}
        triggerEl={fakeAnchorEl}
      />,
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.left).toEqual('50%');
    expect(popoverNode.style.top).toEqual('0px');
    expect(popoverNode.style.transform).toEqual('translateX(-50%) translateY(0px)');
  });

  it('Does render a self closing popover', () => {
    const mockHandleRequestClose = jest.fn();
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        onRequestClose={mockHandleRequestClose}
        triggerEl={fakeAnchorEl}
        useLayerForClickAway={true}
      />,
    );
    const closeLayerNode = ReactDOM.findDOMNode(popoverComponent.closeLayerRef);
    ReactTestUtils.Simulate.click(closeLayerNode);
    expect(mockHandleRequestClose).toBeCalled();
  });

  it('Does not render a self closing popover by default', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover triggerEl={fakeAnchorEl} />,
    );
    expect(popoverComponent.closeLayerRef).not.toBeDefined();
  });

  it('Does not constrain the width', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        constrainWidth={true}
        triggerEl={fakeAnchorEl}
      />,
    );
    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.width).toEqual('100%');
  });

  it('Does constrain the width', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        constrainWidth={true}
        contentWidth={200}
        triggerEl={fakeAnchorEl}
      />,
    );
    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.width).toEqual('200px');
  });

  it('Does set Ref for triggerEl', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        open={true}
        triggerEl={fakeAnchorEl}
      />,
    );
    expect(popoverComponent.triggerElRef).toBeDefined();
  });

  it('Does render a popover when trigger is clicked', () => {
    const popoverComponent = ReactTestUtils.renderIntoDocument(
      <Popover
        open={true}
        triggerEl={fakeAnchorEl}
      />,
    );
    const triggerDivNode = ReactDOM.findDOMNode(popoverComponent.triggerElRef);
    ReactTestUtils.Simulate.click(triggerDivNode);
    expect(popoverComponent.props.open).toEqual(true);
  });
});
