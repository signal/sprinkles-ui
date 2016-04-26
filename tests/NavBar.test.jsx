// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/NavBar");
jest.dontMock("../src/shared/colors");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";
import { BackgroundColors } from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const NavBar = require("../src/components/NavBar").default;

describe("List", () => {
  it("Does render a NavBar", () => {
    const navBarComponent = TestUtils.renderIntoDocument(
      <NavBar />
    );
    expect(navBarComponent).toBeDefined();
  });

  it("Does render a NavBar with expected style", () => {
    const navBarComponent = TestUtils.renderIntoDocument(
      <NavBar />
    );
    const navBarNode = ReactDOM.findDOMNode(navBarComponent);
    expect(navBarNode.style.width).toBe("100%");
    expect(navBarNode.style.height).toBe("55px");
    expect(color(navBarNode.style.background).hexString()).toBe(BackgroundColors.navBar);
  });

  it("Does render a fixed NavBar", () => {
    const navBarComponent = TestUtils.renderIntoDocument(
      <NavBar position={"fixed"} />
    );
    const navBarNode = ReactDOM.findDOMNode(navBarComponent);
    expect(navBarNode.style.top).toBe("0px");
    expect(navBarNode.style.right).toBe("0px");
    expect(navBarNode.style.left).toBe("0px");
    expect(navBarNode.style.height).toBe("55px");
    expect(navBarNode.style.position).toBe("fixed");
  });
});
