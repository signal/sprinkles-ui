// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Form");
jest.dontMock("../src/components/Button");
jest.dontMock("../src/components/Field");
jest.dontMock("../src/components/TextInput");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Form = require("../src/components/Form").default;
const Field = require("../src/components/Field").default;
const TextInput = require("../src/components/TextInput").default;


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
    expect(submitButtonNode.attributes.hasOwnProperty("disabled")).toEqual(false);
  });

  it("Does submit Form when all Fields are valid", () => {
    let mockHandleSubmit = jest.fn();
    const formComponent = TestUtils.renderIntoDocument(
        <Form onSubmit={mockHandleSubmit}/>
    );

    const submitButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    TestUtils.Simulate.click(submitButtonNode);
    expect(mockHandleSubmit).toBeCalled();
  });

  it("Does not submit Form when at least one Field is not valid ", () => {
    let mockHandleSubmit = jest.fn();
    const formComponent = TestUtils.renderIntoDocument(
        <Form onSubmit={mockHandleSubmit}/>
    );

    // mark form as invalid
    formComponent.state.isValid = false;

    const submitButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    TestUtils.Simulate.click(submitButtonNode);
    expect(mockHandleSubmit).not.toBeCalled();
  });
});
