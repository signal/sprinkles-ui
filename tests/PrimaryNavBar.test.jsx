// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/PrimaryNavBar");
jest.dontMock("../src/shared/colors");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";
import { BackgroundColors } from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const PrimaryNavBar = require("../src/components/PrimaryNavBar").default;

describe("Primary Navigation Bar", () => {
  it("does render a Bar", () => {
    const primaryNavBarComponent = TestUtils.renderIntoDocument(
      <PrimaryNavBar />
    );
    expect(primaryNavBarComponent).toBeDefined();
  });

  it("does render a NavBar with expected style", () => {
    const primaryNavBarComponent = TestUtils.renderIntoDocument(
      <PrimaryNavBar />
    );
    const pNavBarNode = ReactDOM.findDOMNode(primaryNavBarComponent);
    expect(pNavBarNode.style.width).toBe("100%");
    expect(pNavBarNode.style.display).toBe("flex");
    expect(pNavBarNode.style.flexDirection).toBe("column");
    expect(pNavBarNode.style.justifyContent).toBe("flexStart");
    expect(color(pNavBarNode.style.background).hexString()).toBe(BackgroundColors.primaryNavBar);
  });

  it("does render app icon", () => {
    const childText = "Howdy";
    const primaryNavBarComponent = TestUtils.renderIntoDocument(
      <PrimaryNavBar appIcon={
          <div>Howdy</div>
      }
      />
    );
    const pNavBarNode = ReactDOM.findDOMNode(primaryNavBarComponent);
    expect(pNavBarNode.textContent).toBe(childText);
  });

  it("does render bottom navigation items", () => {
    const childText = "Howdy";
    const primaryNavBarComponent = TestUtils.renderIntoDocument(
      <PrimaryNavBar bottomNavItems={
          <div>Howdy</div>
      }
      />
    );
    const pNavBarNode = ReactDOM.findDOMNode(primaryNavBarComponent);
    expect(pNavBarNode.textContent).toBe(childText);
  });

  it("does render center navigation items", () => {
    const childText = "Howdy";
    const primaryNavBarComponent = TestUtils.renderIntoDocument(
      <PrimaryNavBar centerNavItems={
          <div>Howdy</div>
      }
      />
    );
    const pNavBarNode = ReactDOM.findDOMNode(primaryNavBarComponent);
    expect(pNavBarNode.textContent).toBe(childText);
  });
});
