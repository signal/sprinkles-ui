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
        <ListItem>{text}</ListItem>
    );
    // grab the DOM node so we can inspect it
    const menuItemNode = ReactDOM.findDOMNode(listItem);
    // Verify that it"s rendered with the right text
    expect(menuItemNode.textContent).toEqual(text);
  });

  it("Does trigger an event when clicked", (done) => {
    const listItem = TestUtils.renderIntoDocument(
        <ListItem onClick={() => done()} />
    );

    const listItemNode = ReactDOM.findDOMNode(listItem);

    TestUtils.Simulate.click(listItemNode);
  });

  it("Does render a selected ListItem", () => {
    const listItem = TestUtils.renderIntoDocument(
        <ListItem selected={true}>{"Selected"}</ListItem>
    );
    expect(listItem.props.selected).toEqual(true);
  });

  it("Does render a hovered ListItem", () => {
    const listItem = TestUtils.renderIntoDocument(
        <ListItem>{"some text"}</ListItem>
    );
    listItem.setState = jest.genMockFunction();
    const listItemNode = ReactDOM.findDOMNode(listItem);
    expect(listItem.setState).not.toBeCalled();
    TestUtils.Simulate.mouseOver(listItemNode);
    expect(listItem.setState).toBeCalledWith({ isHovering: true });
    TestUtils.Simulate.mouseOut(listItemNode);
    expect(listItem.setState).toBeCalledWith({ isHovering: false });
  });
});
