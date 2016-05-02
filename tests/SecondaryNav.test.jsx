// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/SecondaryNav");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const SecondaryNav = require("../src/components/SecondaryNav").default;

describe("List", () => {
  it("does render a NavBar", () => {
    const secNavComponent = TestUtils.renderIntoDocument(
      <SecondaryNav />
    );
    expect(secNavComponent).toBeDefined();
  });

  it("does render left children", () => {
    const text = "left text";
    const secNavComponent = TestUtils.renderIntoDocument(
      <SecondaryNav leftItems={<div>{text}</div>} />
    );
    const leftItemsNode = ReactDOM.findDOMNode(secNavComponent.leftItemsRef);
    expect(leftItemsNode.textContent).toBe(text);
    expect(leftItemsNode.style.display).toBe("flex");
  });
});
