// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/MenuItem");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const MenuItem = require("../src/components/MenuItem").default;


describe("MenuItem", () => {
  it("Renders a MenuItem", () => {
    const text = "howdy";

    // Render a MenuItem with no style
    const menuItem = TestUtils.renderIntoDocument(
        <MenuItem text= {text} />
    );
    // grab the DOM node so we can inspect it
    const menuItemNode = ReactDOM.findDOMNode(menuItem);

    // Verify that it"s rendered with the right text
    expect(menuItemNode.textContent).toEqual(text);

  });

});
