// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Popover");
jest.dontMock("reactcss");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Popover = require("../src/components/Popover").default;


describe("Popover", () => {
  it("Does render a Popover", () => {
    const text = "howdy";

    // Render a Popover
    const popovertComponent = TestUtils.renderIntoDocument(
        <Popover open={true}>{text}</Popover>
    );

    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popovertComponent);

    // Verify that it"s rendered with the right text
    expect(popoverNode.textContent).toEqual(text);

  });

  it("Does render an open Popover", () => {
    // Render a Popover
    const popovertComponent = TestUtils.renderIntoDocument(
        <Popover open={true}/>
    );

    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popovertComponent);

    // Verify that it"s rendered with the right text
    expect(popoverNode.style.display).toEqual("block");
  });

  it("Does render a closed Popover", () => {
    // Render a Popover
    const popovertComponent = TestUtils.renderIntoDocument(
        <Popover/>
    );

    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popovertComponent);

    // Verify that it"s rendered with the right text
    expect(popoverNode.style.display).toEqual("none");
  });

  it("Does render an anchored Popover", () => {
    const top = 1;
    const left = 2;
    const fakeAnchorEl = {
      getBoundingClientRect: function () {
        return {
          bottom: top,
          left: left
        };
      }
    };

    // Render a Popover
    const popovertComponent = TestUtils.renderIntoDocument(
        <Popover anchorEl={fakeAnchorEl}/>
    );

    // grab the DOM node so we can inspect it
    const popoverNode = ReactDOM.findDOMNode(popovertComponent);

    expect(popoverNode.style.top).toEqual(top + "px");
    expect(popoverNode.style.left).toEqual(left + "px");
  });
});
