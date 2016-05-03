// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Dropdown");
jest.dontMock("../src/components/List");
jest.dontMock("../src/components/ListItem");
jest.dontMock("../src/components/TextListItem");
jest.dontMock("../src/components/Popover");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Dropdown = require("../src/components/Dropdown").default;


describe("Dropdown", () => {
  const generateFakeAnchorEl = () => ({
    getBoundingClientRect() {
      return {
        top: 1,
        bottom: 2,
        left: 3,
        right: 4,
      };
    },
  });

  it("Does render a Dropdown", () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
        <Dropdown />
    );
    expect(dropdownComponent).toBeDefined();
  });

  it("Does render a list of items", () => {
    const items = [
      {
        key: "key",
        value: "value",
      },
    ];
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown items={items} />
    );
    expect(dropdownComponent.itemsRef.listItemRefs.count()).toBe(1);
  });

  it("Does render a closed dropdown", () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown />
    );
    const dropdownNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef);
    expect(dropdownNode.style.display).toBe("none");
  });

  it("Does render an opened dropdown", () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown open={true} />
    );
    const dropdownNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef);
    expect(dropdownNode.style.display).toBe("block");
  });

  it("Does render an anchored Dropdown", () => {
    const fakeAnchorEl = generateFakeAnchorEl();
    const dropdownComponent = TestUtils.renderIntoDocument(
      <Dropdown anchorEl={fakeAnchorEl} />
    );
    const dropdownNode = ReactDOM.findDOMNode(dropdownComponent.popoverRef);
    expect(dropdownNode.style.top).toEqual("2px");
    expect(dropdownNode.style.left).toEqual("3px");
  });
});
