// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/ListItem");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const ListItem = require("../src/components/ListItem").default;


describe("ListItem", () => {
  it("Does render a ListItem", () => {
    const text = "howdy";

    // Render a ListItem with no style
    const listItem = TestUtils.renderIntoDocument(
        <ListItem text= {text} />
    );
    // grab the DOM node so we can inspect it
    const menuItemNode = ReactDOM.findDOMNode(listItem);

    // Verify that it"s rendered with the right text
    expect(menuItemNode.textContent).toEqual(text);

  });

  it("Does trigger an event when clicked", (done) => {
    function clickEvent() {
      done();
    }

    const listItem = TestUtils.renderIntoDocument(
        <ListItem handleClick={clickEvent} />
    );

    const menuItemNode = ReactDOM.findDOMNode(listItem);

    TestUtils.Simulate.click(menuItemNode);
  });

});
