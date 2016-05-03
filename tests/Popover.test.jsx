// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Popover");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Popover = require("../src/components/Popover").default;


describe("Popover", () => {
  function generateFakeAnchorEl() {
    return {
      getBoundingClientRect() {
        return {
          top: 1,
          bottom: 2,
          left: 3,
          right: 4,
        };
      },
    };
  }

  it("Does render a Popover", () => {
    const text = "howdy";
    // Render a Popover
    const popoverComponent = TestUtils.renderIntoDocument(
        <Popover open={true}>{text}</Popover>
    );
    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    // Verify that it"s rendered with the right text
    expect(popoverNode.textContent).toEqual(text);
  });

  it("Does render an open Popover", () => {
    // Render a Popover
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover open={true} />
    );
    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    // Verify that it"s rendered with the right text
    expect(popoverNode.style.display).toEqual("block");
  });

  it("Does render a closed Popover", () => {
    // Render a Popover
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover />
    );
    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    // Verify that it"s rendered with the right text
    expect(popoverNode.style.display).toEqual("none");
  });

  it("Does render an anchored Popover", () => {
    const fakeAnchorEl = generateFakeAnchorEl();
    // Render a Popover
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover anchorEl={fakeAnchorEl} />
    );
    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    expect(popoverNode.style.top).toEqual("2px");
    expect(popoverNode.style.left).toEqual("3px");
  });

  it("Does set anchorOrigin h:left, v:bottom", () => {
    const fakeAnchorEl = generateFakeAnchorEl();
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        anchorEl={fakeAnchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      />
    );

    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    expect(popoverNode.style.top).toEqual("2px");
    expect(popoverNode.style.left).toEqual("3px");
  });

  it("Does set anchorOrigin h:left, v:top", () => {
    const fakeAnchorEl = generateFakeAnchorEl();
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        anchorEl={fakeAnchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      />
    );
    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    expect(popoverNode.style.top).toEqual("1px");
    expect(popoverNode.style.left).toEqual("3px");
  });

  it("Does set anchorOrigin h:right, v:bottom", () => {
    const fakeAnchorEl = generateFakeAnchorEl();
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        anchorEl={fakeAnchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      />
    );
    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    expect(popoverNode.style.top).toEqual("2px");
    expect(popoverNode.style.left).toEqual("4px");
  });

  it("Does set anchorOrigin h:right, v:top", () => {
    const fakeAnchorEl = generateFakeAnchorEl();
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        anchorEl={fakeAnchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      />
    );

    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popoverComponent);
    expect(popoverNode.style.top).toEqual("1px");
    expect(popoverNode.style.left).toEqual("4px");
  });

  it("Does render a self closing popever", () => {
    const mockHandleRequestClose = jest.fn();
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover
        onRequestClose={mockHandleRequestClose}
        useLayerForClickAway={true}
      />
    );
    const closeLayerNode = ReactDOM.findDOMNode(popoverComponent.closeLayerRef);
    TestUtils.Simulate.click(closeLayerNode);
    expect(mockHandleRequestClose).toBeCalled();
  });

  it("Does not render a self closing popover by default", () => {
    const popoverComponent = TestUtils.renderIntoDocument(
      <Popover />
    );
    expect(popoverComponent.closeLayerRef).not.toBeDefined();
  });
});
