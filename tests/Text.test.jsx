// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Text");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Text = require("../src/components/Text").default;


describe("Text", () => {
  it("Does render a Text", () => {
    const text = "howdy";
    // Render a Text with no style
    const textComponent = TestUtils.renderIntoDocument(
        <Text>{text}</Text>
    );
    // grab the DOM node so we can inspect it
    const textNode = ReactDOM.findDOMNode(textComponent);
    // Verify that it"s rendered with the right text
    expect(textNode.textContent).toEqual(text);
  });

  it("Does Render Bold Text", () => {
    const text = "howdy";
    const textComponent = TestUtils.renderIntoDocument(
        <Text fontWeight={"bold"}>{text}</Text>
    );
    const textNode = ReactDOM.findDOMNode(textComponent);
    expect(textNode.style.fontWeight).toEqual("bold");
  });
});
