import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// don't mock our CUT or components it depends on
jest.dontMock('../src/components/Popover');

// TODO: move this to es6 style import when its implemented in jest
const Popover = require('../src/components/Popover').default;


describe('Popover', () => {
  function generateFakeAnchorEl() {
    return (<div />);
  }
  const fakeAnchorEl = generateFakeAnchorEl();

  it('Does render a Popover', () => {
    const text = 'howdy';
    // Render a Popover
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        defaultOpen={true}
        triggerEl={fakeAnchorEl}
      >{text}
      </Popover>
    );
    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    // Verify that it's rendered with the right text
    expect(popoverNode.textContent).toEqual(text);
  });

  it('Does render an open Popover', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        open={true}
        triggerEl={fakeAnchorEl}
      />
    );
    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.visibility).toEqual('visible');
  });

  it('Does render a closed Popover', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover triggerEl={fakeAnchorEl} />
    );
    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.visibility).toEqual('hidden');
  });

  it('Does set anchorOrigin left', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'left'}
        triggerEl={fakeAnchorEl}
      />
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateY(-50%) translateX(-100%)');
  });

  it('Does set anchorOrigin right', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'right'}
        triggerEl={fakeAnchorEl}
      />
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.top).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateY(-50%) translateX(0)');
  });

  it('Does set anchorOrigin top', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'top'}
        triggerEl={fakeAnchorEl}
      />
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.bottom).toEqual('0px');
  });

  it('Does set anchorOrigin bottom', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        anchorOrigin={'bottom'}
        triggerEl={fakeAnchorEl}
      />
    );

    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.left).toEqual('50%');
    expect(popoverNode.style.transform).toEqual('translateX(-50%) translateY(0)');
  });

  it('Does render a self closing popover', () => {
    const mockHandleRequestClose = jest.fn();
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        onRequestClose={mockHandleRequestClose}
        triggerEl={fakeAnchorEl}
        useLayerForClickAway={true}
      />
    );
    const closeLayerNode = ReactDOM.findDOMNode(popoverComponent.closeLayerRef);
    TestUtils.Simulate.click(closeLayerNode);
    expect(mockHandleRequestClose).toBeCalled();
  });

  it('Does not render a self closing popover by default', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover triggerEl={fakeAnchorEl} />
    );
    expect(popoverComponent.closeLayerRef).not.toBeDefined();
  });

  it('Does not constrain the width', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        constrainWidth={true}
        triggerEl={fakeAnchorEl}
      />
    );
    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.width).toEqual('100%');
  });

  it('Does constrain the width', () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        constrainWidth={true}
        contentWidth={200}
        triggerEl={fakeAnchorEl}
      />
    );
    const popoverNode = ReactDOM.findDOMNode(popoverComponent.contentRef);
    expect(popoverNode.style.width).toEqual('200px');
  });
});
