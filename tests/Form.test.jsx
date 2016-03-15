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

    formComponent.validate = jest.genMockFunction();

    const submitButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    TestUtils.Simulate.click(submitButtonNode);
    expect(mockHandleSubmit).toBeCalled();
    expect(formComponent.validate).toBeCalled();
  });

  it("Does not submit Form when at least one Field is not valid ", () => {
    let mockHandleSubmit = jest.fn();
    const formComponent = TestUtils.renderIntoDocument(
        <Form onSubmit={mockHandleSubmit}/>
    );

    formComponent.validate = jest.genMockFunction();

    // mark form as invalid
    formComponent.state.isValid = false;

    const submitButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    TestUtils.Simulate.click(submitButtonNode);
    expect(mockHandleSubmit).not.toBeCalled();
    expect(formComponent.validate).toBeCalled();
  });

  it("Does set a valid state inputs are valid", () => {
    const formComponent = TestUtils.renderIntoDocument(
        <Form />
    );

    const fakeInput = {
      isValid: () => true
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput, 0)
    });
    formComponent.setState = jest.genMockFunction();

    formComponent.validate();
    expect(formComponent.setState).toBeCalledWith({
      isValid: true,
      inputValidations: {
        0: true
      }
    });
  });

  it("Does set an invalid state when inputs are invalid", () => {
    const formComponent = TestUtils.renderIntoDocument(
        <Form />
    );

    const fakeInput = {
      isValid: () => false
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput, 0)
    });
    formComponent.setState = jest.genMockFunction();

    formComponent.validate();
    expect(formComponent.setState).toBeCalledWith({
      isValid: false,
      inputValidations: {
        0: false
      }
    });
  });

  it("Does clear error state from Field when it changes", () => {
    const formComponent = TestUtils.renderIntoDocument(
        <Form>
            <Field
                required={true}
            >
                <TextInput />
            </Field>
        </Form>
    );
    formComponent.validate();
    const fieldComponent = formComponent.inputRefs.get(0);
    expect(fieldComponent.props.status).toBe("error");
    const textInputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);
    TestUtils.Simulate.change(textInputNode, {target:{value: ""}});
    expect(fieldComponent.props.status).toBe(undefined);
  });
});
