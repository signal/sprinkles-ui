// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/PasswordInput");
jest.dontMock("../src/components/TextInput");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const PasswordInput = require("../src/components/PasswordInput").default;

describe("PasswordInput", () => {
  it("Does render a PasswordInput", () => {
    const passwordInputComponent = TestUtils.renderIntoDocument(
        <PasswordInput />
    );
    const passwordInputNode = ReactDOM.findDOMNode(passwordInputComponent);
    expect(passwordInputNode.getAttribute("type")).toBe("password");
    expect(passwordInputNode.getAttribute("value")).toBe("");
  });

  it("Does render a disabled password input", () => {
    const passwordInputComponent = TestUtils.renderIntoDocument(
      <PasswordInput enabled={"false"} />
    );
    const passwordInputNode = ReactDOM.findDOMNode(passwordInputComponent);
    expect(passwordInputNode.disabled).toBe(true);
  });
});
