// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Form");
jest.dontMock("../src/components/Button");
jest.dontMock("../src/components/Field");
jest.dontMock("../src/components/TextInput");
jest.dontMock("../src/components/Alert");
jest.dontMock("../src/components/Text");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

import Immutable from "immutable";

// TODO: move this to es6 style import when its implemented in jest
const Form = require("../src/components/Form").default;
const Field = require("../src/components/Field").default;
const TextInput = require("../src/components/TextInput").default;


describe("Form", () => {
  it("Does render a Form", () => {
    // Render a Form
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
      <Form onSubmit={mockHandleSubmit} />
    );

    formComponent.validate = jest.genMockFunction().mockReturnValue(true);

    const submitButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    TestUtils.Simulate.click(submitButtonNode);
    expect(mockHandleSubmit).toBeCalled();
    expect(formComponent.validate).toBeCalled();
  });

  it("Does not submit Form when at least one Field is not valid ", () => {
    let mockHandleSubmit = jest.fn();
    const formComponent = TestUtils.renderIntoDocument(
      <Form onSubmit={mockHandleSubmit} />
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
      props: {
        fieldKey: "key",
      },
      validate: () => ({
        valid: true,
        required: true,
        isInitialValue: true,
        validationError: "",
      }),
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput);
    });
    formComponent.setState = jest.genMockFunction();
    formComponent.validate();
    expect(formComponent.setState.mock.calls[0][0].inputValidations.toJS()).toEqual({
      key: {
        valid: true,
        validationError: "",
      },
    });
  });

  it("Does set an invalid state when inputs are invalid", () => {
    const validationError = "some validation error";
    const formComponent = TestUtils.renderIntoDocument(
        <Form />
    );
    const fakeInput = {
      props: {
        fieldKey: "key",
      },
      validate: () => ({
        valid: false,
        required: true,
        isInitialValue: true,
        validationError,
      }),
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput);
    });
    formComponent.setState = jest.genMockFunction();
    formComponent.validate();
    expect(formComponent.setState.mock.calls[0][0].inputValidations.toJS()).toEqual({
      key: {
        valid: false,
        validationError,
      },
    });
  });

  it("Does not set form invalid when Field is not required ", () => {
    const validationError = "some validation error";
    const formComponent = TestUtils.renderIntoDocument(
        <Form />
    );
    const fakeInput = {
      props: {
        fieldKey: "key",
      },
      validate: () => ({
        valid: false,
        required: false,
        isInitialValue: true,
        validationError,
      }),
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput);
    });
    formComponent.setState = jest.genMockFunction();
    formComponent.validate();
    expect(formComponent.setState.mock.calls[0][0].inputValidations.toJS()).toEqual({
      key: {
        valid: true,
        validationError: "",
      },
    });
  });

  it("Does update Form state in Field change handler", () => {
    // const fieldId = 0;
    const formComponent = TestUtils.renderIntoDocument(
      <Form />
    );
    const inputValidations = Immutable.fromJS({
      key: {
        valid: false,
        validationError: "Some Validation Error",
      },
    });
    formComponent.value = jest.genMockFunction();
    formComponent.state = { inputValidations };
    formComponent.setState = jest.genMockFunction();
    formComponent.handleChange("", {
      props: {
        fieldKey: "key",
      },
    });
    expect(formComponent.setState.mock.calls[0][0].inputValidations.toJS()).toEqual({
      key: {
        valid: true,
        validationError: "",
      },
    });
  });

  it("Does clear error state from Field when it changes", () => {
    const formComponent = TestUtils.renderIntoDocument(
      <Form>
        <Field
          fieldKey={"key"}
          required={true}
        >
          <TextInput />
        </Field>
      </Form>
    );
    formComponent.validate();
    const fieldComponent = formComponent.inputRefs.get("key");
    expect(fieldComponent.props.status).toBe("error");
    expect(fieldComponent.props.error).toBe("Field Must Not Be Empty");
    const textInputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);
    TestUtils.Simulate.change(textInputNode, { target: { value: "" } });
    expect(fieldComponent.props.status).toBe(undefined);
    expect(fieldComponent.props.error).toBe("");
  });

  it("Does return Field data when submit button is clicked", () => {
    let mockHandleSubmit = jest.genMockFunction();
    const formComponent = TestUtils.renderIntoDocument(
      <Form onSubmit={mockHandleSubmit}>
        <Field fieldKey={"text"}>
          <TextInput initialValue={"yes"} />
        </Field>
      </Form>
    );
    const submitButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    TestUtils.Simulate.click(submitButtonNode);
    expect(mockHandleSubmit).toBeCalledWith({
      text: "yes",
    });
  });

  it("Does update submit button text", () => {
    const formButtonText = "A Really Cool Button";
    // Render a Form
    const formComponent = TestUtils.renderIntoDocument(
      <Form
        submitButtonText={formButtonText}
      />
    );
    const formButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    expect(formButtonNode.textContent).toBe(formButtonText);
  });

  it("Does show alert when alert is set", () => {
    const title = "Danger";
    const details = "👹👹👹";
    const type = "danger";
    const formComponent = TestUtils.renderIntoDocument(
      <Form
        alert={{
          type,
          title,
          details,
          children: <div>{"Hello"}</div>,
        }}
      />
    );
    expect(formComponent.alertRef.props.type).toBe(type);
    expect(formComponent.alertRef.props.title).toBe(title);
    expect(formComponent.alertRef.props.details).toBe(details);
    expect(formComponent.alertRef.props.children).not.toBeUndefined();
  });

  it("Does show a Form in working state", () => {
    const formComponent = TestUtils.renderIntoDocument(
      <Form working={true}>
        <Field>
          <TextInput />
        </Field>
      </Form>
    );
    formComponent.inputRefs.forEach((input) => {
      expect(input.inputRef.props.enabled).toBe(false);
    });
    expect(formComponent.submitButtonRef.props.working).toBe(true);
  });

  it("Does set error on Field with fieldKey", () => {
    const validationError = "Something on the server broke";
    const fieldKey = "myField";
    const formComponent = TestUtils.renderIntoDocument(
      <Form>
        <Field fieldKey={fieldKey} />
      </Form>
    );
    formComponent.setState = jest.genMockFunction();
    formComponent.invalidateFields([{ fieldKey, validationError }]);
    expect(formComponent.setState.mock.calls[0][0].inputValidations.toJS()).toEqual({
      myField: {
        valid: false,
        validationError,
      },
    });
  });

  it("Does not set error when fieldKey does not exist", () => {
    const validationError = "Something on the server broke";
    const fieldKey = "myField";
    const formComponent = TestUtils.renderIntoDocument(
      <Form>
        <Field fieldKey={fieldKey} />
      </Form>
    );
    formComponent.setState = jest.genMockFunction();
    formComponent.invalidateFields([
      {
        fieldKey: "invalidKey",
        validationError,
      },
    ]);
    expect(formComponent.setState).not.toBeCalled();
  });

  it("Does trigger onChange event when any form field changes", () => {
    const mockHandleChange = jest.genMockFunction();
    const changedText = "changed a";
    const formComponent = TestUtils.renderIntoDocument(
      <Form onChange={mockHandleChange}>
        <Field
          fieldKey={"a"}
        >
          <TextInput initialValue={"init a"} />
        </Field>
        <Field
          fieldKey={"b"}
        >
          <TextInput initialValue={"init b"} />
        </Field>
      </Form>
    );
    const textInputNode = ReactDOM.findDOMNode(formComponent.inputRefs.get("a").inputRef);
    TestUtils.Simulate.change(textInputNode, { target: { value: changedText } });
    expect(mockHandleChange).toBeCalledWith({
      a: changedText,
      b: "init b",
    });
  });

  it("Does skip rendering empty fields", () => {
    const formComponent = TestUtils.renderIntoDocument(
    <Form>
        <Field
          fieldKey={"a"}
        >
          <TextInput initialValue={"init a"} />
        </Field>
        {undefined}
        <Field
          fieldKey={"b"}
        >
          <TextInput initialValue={"init b"} />
        </Field>
      </Form>
    );
    expect(formComponent.value()).toEqual({
      a: "init a",
      b: "init b",
    });
  });
});
