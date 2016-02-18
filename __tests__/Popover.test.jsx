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

});
