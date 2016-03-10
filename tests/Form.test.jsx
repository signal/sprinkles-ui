// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Form");

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

    // grab the DOM node so we can inspect it
    const formNode = ReactDOM.findDOMNode(formComponent);

    expect(formNode).toBeDefined();

  });
});
