// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/List");
jest.dontMock("../src/components/ListItem");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const List = require("../src/components/List").default;


describe("List", () => {
  it("Renders a List", () => {
    const menuItems = [
      {
        key: "1",
        text: "Item 1",
        selected: false
      },
      {
        key: "2",
        text: "Item 2",
        selected: true
      }
    ];
    // Render a List with no style
    const menu = TestUtils.renderIntoDocument(
        <List menuItems={menuItems} />
    );

    // grab the DOM node so we can inspect it
    TestUtils.scryRenderedDOMComponentsWithClass(menu, "li").map((item,i) => {
      expect(item.textContent).toEqual(menuItems[i].text);
    });
  });

});
