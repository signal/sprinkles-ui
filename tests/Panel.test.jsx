// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Panel");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";

// TODO: move this to es6 style import when its implemented in jest
const Panel = require("../src/components/Panel").default;

describe("Panel", () => {
  it("Does render a Panel with default props", () => {
    const panelComponent = TestUtils.renderIntoDocument(
        <Panel />
    );
    const panelNode = ReactDOM.findDOMNode(panelComponent);
    expect(color(panelNode.style.backgroundColor).hexString()).toBe("#FEFEFE");
    expect(panelNode.style.borderRadius).toBe("");
    expect(panelNode.style.boxShadow).toBe("");
    expect(color(panelNode.style.color).hexString()).toBe("#212121");
    expect(panelNode.style.padding).toBe("10px");
  });

  it("Does render a Panel with rounded corners", () => {
    const panelComponent = TestUtils.renderIntoDocument(
        <Panel borderRadius={2} />
    );
    const panelNode = ReactDOM.findDOMNode(panelComponent);
    expect(panelNode.style.borderRadius).toBe("2px");
  });

  it("Does render a Panel with box shadows", () => {
    const panelComponent = TestUtils.renderIntoDocument(
        <Panel boxShadowStrength={2} />
    );
    const panelNode = ReactDOM.findDOMNode(panelComponent);
    expect(panelNode.style.boxShadow).not.toBeUndefined();
  });

  it("Does render a Panel with text color", () => {
    const panelComponent = TestUtils.renderIntoDocument(
        <Panel color="#999999" />
    );
    const panelNode = ReactDOM.findDOMNode(panelComponent);
    expect(color(panelNode.style.color).hexString()).toBe("#999999");
  });

  it("Does render a Panel with custom padding", () => {
    const panelComponent = TestUtils.renderIntoDocument(
        <Panel padding="10px 5px 20px 3px" />
    );
    const panelNode = ReactDOM.findDOMNode(panelComponent);
    expect(panelNode.style.padding).toBe("10px 5px 20px 3px");
  });

  it("Does render a Panel with children", () => {
    const panelComponent = TestUtils.renderIntoDocument(
        <Panel children={ <div>{"Hello"}</div> } />
    );
    const panelNode = ReactDOM.findDOMNode(panelComponent);
    expect(panelNode.children).not.toBeUndefined();
  });
});
