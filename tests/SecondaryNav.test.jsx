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

  it("does render secondary navbar with expected style", () => {
    const secNavComponent = TestUtils.renderIntoDocument(
      <SecondaryNav />
    );
    const secondaryNavNode = ReactDOM.findDOMNode(secNavComponent);
    expect(secondaryNavNode.style.display).toBe("flex");
    expect(secondaryNavNode.style.flexWrap).toBe("nowrap");
    expect(secondaryNavNode.style.height).toBe("100%");
    expect(secondaryNavNode.style.alignItems).toBe("center");
    expect(secondaryNavNode.style.padding).toBe("0px 20px");
  });

  it("does render left children", () => {
    const text = "left text";
    const secNavComponent = TestUtils.renderIntoDocument(
      <SecondaryNav leftItems={<div>{text}</div>} />
    );
    const leftItemsNode = ReactDOM.findDOMNode(secNavComponent.leftItemsRef);
    expect(leftItemsNode.textContent).toBe(text);
    expect(leftItemsNode.style.display).toBe("flex");
    expect(leftItemsNode.style.flex).toBe("1");
  });

  it("does render right children", () => {
    const text = "right text";
    const secNavComponent = TestUtils.renderIntoDocument(
      <SecondaryNav rightItems={<div>{text}</div>} />
    );
    const rightItemsNode = ReactDOM.findDOMNode(secNavComponent.rightItemsRef);
    expect(rightItemsNode.textContent).toBe(text);
    expect(rightItemsNode.style.display).toBe("flex");
    expect(rightItemsNode.style.flex).toBe("1");
    expect(rightItemsNode.style.justifyContent).toBe("flex-end");
  });
});
