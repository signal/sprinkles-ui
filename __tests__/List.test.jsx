// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/List");
jest.dontMock("../src/components/ListItem");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const List = require("../src/components/List").default;

describe("List", () => {
  it("Does render a List", () => {
    const listItems = [
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
    const list = TestUtils.renderIntoDocument(
        <List listItems={listItems} />
    );

    // grab the DOM node so we can inspect it
    TestUtils.scryRenderedDOMComponentsWithTag(list, "li").forEach((item,i) => {
      expect(item.textContent).toEqual(listItems[i].text);
    });
  });

  it("Does trigger an event when list item clicked", (done) => {
    const listItems = [
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

    // create a copy of the list items
    let setItems = new Set(listItems);

    // handle click events
    function clickEvent(item) {
      setItems.delete(item);

      // all items have been clicked
      if (setItems.size === 0) {
        done();
      }
    }

    // Render a List with no style
    const list = TestUtils.renderIntoDocument(
        <List
            handleItemClick={clickEvent}
            listItems={listItems}
        />
    );

    TestUtils.scryRenderedDOMComponentsWithTag(list, "li").forEach((item) => {
      TestUtils.Simulate.click(item);
    });
  });
});
