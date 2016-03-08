// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Button");
jest.dontMock("reactcss");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Button = require("../src/components/Button").default;

describe("Button", () => {
  it("Does render a Button with default text", () => {
    const text = "Submit";

    // Render an TextInput
    const buttonComponent = TestUtils.renderIntoDocument(
        <Button />
    );

    // grab the DOM node so we can inspect it
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);

    expect(buttonNode.innerHTML).toEqual(text);

  });

  it("Disabled attribute is present when working propery is set", () => {
    // Render an TextInput
    const buttonComponent = TestUtils.renderIntoDocument(
        <Button isWorking={true} />
    );

    // grab the DOM node so we can inspect it
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.attributes.hasOwnProperty("disabled")).toEqual(true);

  });
});
