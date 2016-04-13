// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/List");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const List = require("../src/components/List").default;

describe("List", () => {
  it("Does render a List", () => {
    const listItems = ["Item 1", "Item 2"];
    const list = TestUtils.renderIntoDocument(
      <List>
        {listItems.map((item, i) => <span key={i}>{item}</span>)}
      </List>
    );
    // grab the DOM node so we can inspect it
    TestUtils.scryRenderedDOMComponentsWithTag(list, "span").forEach((item, i) => {
      expect(item.textContent).toEqual(listItems[i]);
    });
  });

  it("Does trigger an event when list is clicked", (done) => {
    const list = TestUtils.renderIntoDocument(
        <List onClick={() => done()} />
    );
    const listNode = ReactDOM.findDOMNode(list);
    TestUtils.Simulate.click(listNode);
  });
});
