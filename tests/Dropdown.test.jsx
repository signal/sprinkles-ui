// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Dropdown");
jest.dontMock("../src/components/List");
jest.dontMock("../src/components/ListItem");
jest.dontMock("../src/components/TextListItem");

import React from "react";
// import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Dropdown = require("../src/components/Dropdown").default;


describe("Dropdown", () => {
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
});
