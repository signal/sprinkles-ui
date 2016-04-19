// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/ListItem");
jest.dontMock("../src/components/TextListItem");
jest.dontMock("../src/shared/Colors");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";
import { Colors, StructuralColors } from "../src/shared/Colors";

// TODO: move this to es6 style import when its implemented in jest
const ListItem = require("../src/components/ListItem").default;
const TextListItem = require("../src/components/TextListItem").default;


describe("ListItem", () => {
  it("Does render a ListItem", () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem />
    );
    expect(listItemComponent).toBeDefined();
  });

  it("Does trigger an event when clicked", () => {
    const mockHandleClick = jest.genMockFunction();
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem onClick={mockHandleClick} />
    );
    const listItemNode = ReactDOM.findDOMNode(listItemComponent);
    TestUtils.Simulate.click(listItemNode);
    expect(mockHandleClick).toBeCalled();
  });

  it("Does set hover prop on children when hovered", () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem>
        <TextListItem />
      </ListItem>
    );
    const listItemNode = ReactDOM.findDOMNode(listItemComponent);
    TestUtils.Simulate.mouseOver(listItemNode);
    let textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.cursor).toBe("pointer");
    TestUtils.Simulate.mouseOut(listItemNode);
    textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.cursor).toBe("");
  });

  it("Does set selected prop on children when selected", () => {
    const listItemComponent = TestUtils.renderIntoDocument(
      <ListItem
        selected={true}
      >
        <TextListItem />
      </ListItem>
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(color(textListItemNode.style.background).hexString()).toBe(Colors.info);
  });

  it("Does render first TextListItem", () => {
    const listItemComponent = TestUtils.renderIntoDocument(
        <ListItem
          listPosition={"first"}
        >
          <TextListItem />
        </ListItem>
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
  });

  it("Does render middle ListItem", () => {
    const listItemComponent = TestUtils.renderIntoDocument(
        <ListItem
          listPosition={"middle"}
        >
          <TextListItem />
        </ListItem>
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom)
      .toBe(`1px solid ${StructuralColors.divider}`);
  });

  it("Does render last ListItem", () => {
    const listItemComponent = TestUtils.renderIntoDocument(
        <ListItem
          listPosition={"last"}
        >
          <TextListItem />
        </ListItem>
    );
    const textListItemNode = ReactDOM.findDOMNode(listItemComponent.listItemRef);
    expect(textListItemNode.style.borderBottom).toBe("");
  });
});
