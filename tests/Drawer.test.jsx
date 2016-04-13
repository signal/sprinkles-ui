// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Drawer");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";
import { BackgroundColors } from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const Drawer = require("../src/components/Drawer").default;


describe("Drawer", () => {
  it("Does render a Drawer component", () => {
    const drawerComponent = TestUtils.renderIntoDocument(
      <Drawer />
    );
    expect(drawerComponent).toBeDefined();
  });

  it("Does render a Drawer with default style", () => {
    const drawerComponent = TestUtils.renderIntoDocument(
      <Drawer />
    );
    const drawerNode = ReactDOM.findDOMNode(drawerComponent);
    expect(drawerNode.style.width).toBe("300px");
    expect(drawerNode.style.height).toBe("100%");
    expect(drawerNode.style.position).toBe("fixed");
    expect(drawerNode.style.top).toBe("0px");
    expect(drawerNode.style.right).toBe("-300px"); // not showing
    expect(drawerNode.style.zIndex).toBe("1300");
    expect(color(drawerNode.style.background).hexString()).toBe(BackgroundColors.light);
  });

  it("Does render children in the Drawer", () => {
    const drawerComponent = TestUtils.renderIntoDocument(
      <Drawer>
        <div>{"hi"}</div>
      </Drawer>
    );
    const drawerNode = ReactDOM.findDOMNode(drawerComponent);
    expect(drawerNode.children).not.toEqual({});
  });

  it("Does render an open drawer", () => {
    const drawerComponent = TestUtils.renderIntoDocument(
      <Drawer open={true} />
    );
    const drawerNode = ReactDOM.findDOMNode(drawerComponent);
    expect(drawerNode.style.right).toBe("0px");
  });

  it("Does render a custom backgound color", () => {
    const customColor = "#DDDDDD";
    const drawerComponent = TestUtils.renderIntoDocument(
      <Drawer backgroundColor={customColor} />
    );
    const drawerNode = ReactDOM.findDOMNode(drawerComponent);
    expect(color(drawerNode.style.background).hexString()).toBe(customColor);
  });

  it("Does render a custom width", () => {
    const drawerComponent = TestUtils.renderIntoDocument(
      <Drawer width={500} />
    );
    const drawerNode = ReactDOM.findDOMNode(drawerComponent);
    expect(drawerNode.style.width).toBe("500px");
    expect(drawerNode.style.right).toBe("-500px");
  });

  it("Does render a drawer on the left", () => {
    const drawerComponent = TestUtils.renderIntoDocument(
      <Drawer openFrom={"left"} />
    );
    const drawerNode = ReactDOM.findDOMNode(drawerComponent);
    expect(drawerNode.style.left).toBe("-300px");
    expect(drawerNode.style.right).toBe("");
  });

  it("Does open a Drawer on the left", () => {
    const drawerComponent = TestUtils.renderIntoDocument(
      <Drawer
        open={true}
        openFrom={"left"}
      />
    );
    const drawerNode = ReactDOM.findDOMNode(drawerComponent);
    expect(drawerNode.style.left).toBe("0px");
    expect(drawerNode.style.right).toBeDefined("");
  });
});
