// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/List");
jest.dontMock("../src/components/ListItem");
jest.dontMock("../src/components/TextListItem");
jest.dontMock("../src/components/Text");
jest.dontMock("../src/shared/colors");

import React from "react";
import ReactDOM from "react-dom";
import color from "color";
import { TextColors } from "../src/shared/colors";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const List = require("../src/components/List").default;
const ListItem = require("../src/components/ListItem").default;
const TextListItem = require("../src/components/TextListItem").default;

describe("List", () => {
  it("Does render a List", () => {
    const listComponent = TestUtils.renderIntoDocument(
      <List />
    );
    expect(listComponent).toBeDefined();
  });

  it("Does render list children", () => {
    const text = "howdy";
    const listComponent = TestUtils.renderIntoDocument(
      <List>
        <ListItem>
          <TextListItem
            text={text}
          />
        </ListItem>
      </List>
    );
    const textListItemNode = ReactDOM.findDOMNode(listComponent.listItemRefs.get(0).listItemRef);
    expect(textListItemNode.textContent).toBe(text);
  });

  it("Does render single list item with expected styles", () => {
    const listComponent = TestUtils.renderIntoDocument(
      <List>
        <ListItem>
          <TextListItem />
        </ListItem>
      </List>
    );
    const textListItemNode = ReactDOM.findDOMNode(listComponent.listItemRefs.get(0).listItemRef);
    expect(textListItemNode.style.borderBottom).toBe("");
  });

  it("Does render 2 item list item with expected styles", () => {
    const listComponent = TestUtils.renderIntoDocument(
      <List>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
      </List>
    );
    const firstTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(0).listItemRef);
    expect(firstTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${color(TextColors.dark).lighten(1.5).hexString()}`);
    const lastTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(1).listItemRef);
    expect(lastTextListItemNode.style.borderBottom).toBe("");
  });

  it("Does render 3 item list item with expected styles", () => {
    const listComponent = TestUtils.renderIntoDocument(
      <List>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
        <ListItem>
          <TextListItem />
        </ListItem>
      </List>
    );
    const firstTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(0).listItemRef);
    expect(firstTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${color(TextColors.dark).lighten(1.5).hexString()}`);
    const secondTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(1).listItemRef);
    expect(secondTextListItemNode.style.borderBottom)
      .toBe(`1px solid ${color(TextColors.dark).lighten(1.5).hexString()}`);
    const lastTextListItemNode = ReactDOM
      .findDOMNode(listComponent.listItemRefs.get(2).listItemRef);
    expect(lastTextListItemNode.style.borderBottom).toBe("");
  });
});
