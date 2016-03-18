// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/EmailInput");
jest.dontMock("../src/components/TextInput");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const EmailInput = require("../src/components/EmailInput").default;

describe("EmailInput", () => {
  it("Does render a EmailInput", () => {
    const emailInputComponent = TestUtils.renderIntoDocument(
        <EmailInput initialValue={"test@signal.co"}/>
    );
    const emailInputNode = ReactDOM.findDOMNode(emailInputComponent);
    expect(emailInputNode.getAttribute("value")).toBe("test@signal.co");
  });
});
