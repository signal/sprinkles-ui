// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Form");
jest.dontMock("../src/components/Button");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Form = require("../src/components/Form").default;


describe("Form", () => {
  it("Does render a Form", () => {
    // Render an Form
    const formComponent = TestUtils.renderIntoDocument(
        <Form />
    );

    const formNode = ReactDOM.findDOMNode(formComponent);
    expect(formNode).not.toBeNull();

    const submitButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    expect(submitButtonNode).not.toBeNull();

  });
});
