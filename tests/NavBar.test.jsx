// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/NavBar");
jest.dontMock("../src/components/Text");
jest.dontMock("../src/shared/colors");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";
import { BackgroundColors } from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const NavBar = require("../src/components/NavBar").default;

describe("List", () => {
  it("does render a NavBar", () => {
    const navBarComponent = TestUtils.renderIntoDocument(
      <NavBar />
    );
    expect(navBarComponent).toBeDefined();
  });

  it("does render a NavBar with expected style", () => {
    const navBarComponent = TestUtils.renderIntoDocument(
      <NavBar />
    );
    const navBarNode = ReactDOM.findDOMNode(navBarComponent);
    expect(navBarNode.style.height).toBe("55px");
    expect(navBarNode.style.display).toBe("flex");
    expect(navBarNode.style.alignItems).toBe("center");
    expect(navBarNode.style.padding).toBe("0px 20px");
    expect(color(navBarNode.style.background).hexString()).toBe(BackgroundColors.secondaryNavBar);
  });

  it("does render a fixed NavBar", () => {
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

  it("does render title", () => {
    const titleText = "My Cool App";
    const navBarComponent = TestUtils.renderIntoDocument(
      <NavBar title={titleText} />
    );
    const titleNode = ReactDOM.findDOMNode(navBarComponent.titleRef);
    expect(titleNode.textContent).toBe(titleText);
  });

  it("does not render title if not set", () => {
    const navBarComponent = TestUtils.renderIntoDocument(
      <NavBar />
    );
    expect(navBarComponent.titleRef).not.toBeDefined();
  });

  it("does render children", () => {
    const text = "Menu Item";
    const navBarComponent = TestUtils.renderIntoDocument(
      <NavBar>
        <div>{text}</div>
      </NavBar>
    );
    const navBarNode = ReactDOM.findDOMNode(navBarComponent);
    expect(navBarNode.textContent).toBe(text);
  });
});
