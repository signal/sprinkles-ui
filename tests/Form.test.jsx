// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Form");
jest.dontMock("../src/components/Button");
jest.dontMock("../src/components/Field");
jest.dontMock("../src/components/TextInput");
jest.dontMock("../src/components/AlertMessage");
jest.dontMock("../src/components/Text");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

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
        <Form onSubmit={mockHandleSubmit}/>
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
      validate: () => {
        return {
          valid: true,
          required: true,
          isInitialValue: true,
          validationError: ""
        }
      }
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput, 0)
    });
    formComponent.setState = jest.genMockFunction();
    formComponent.validate();
    expect(formComponent.setState).toBeCalledWith({
      inputValidations: {
        0: {
          valid: true,
          validationError: ""
        }
      }
    });
  });

  it("Does set an invalid state when inputs are invalid", () => {
    const validationError = "some validation error";
    const formComponent = TestUtils.renderIntoDocument(
        <Form />
    );
    const fakeInput = {
      validate: () => {
        return {
          valid: false,
          required: true,
          isInitialValue: true,
          validationError: validationError
        }
      }
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput, 0)
    });
    formComponent.setState = jest.genMockFunction();
    formComponent.validate();
    expect(formComponent.setState).toBeCalledWith({
      inputValidations: {
        0: {
          valid: false,
          validationError: validationError
        }
      }
    });
  });

  it("Does not set form invalid when Field is not required ", () => {
    const validationError = "some validation error";
    const formComponent = TestUtils.renderIntoDocument(
        <Form />
    );
    const fakeInput = {
      validate: () => {
        return {
          valid: false,
          required: false,
          isInitialValue: true,
          validationError: validationError
        }
      }
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput, 0)
    });
    formComponent.setState = jest.genMockFunction();
    formComponent.validate();
    expect(formComponent.setState).toBeCalledWith({
      inputValidations: {
        0: {
          valid: true,
          validationError: ""
        }
      }
    });
  });

  it("Does update Form state in Field change handler", () => {
    const fieldId = 0;
    const formComponent = TestUtils.renderIntoDocument(
        <Form />
    );
    const fakeInput = {
      validate: () => {
        return {
          valid: false,
          required: false,
          isInitialValue: true,
          validationError: validationError
        }
      }
    };
    formComponent.inputRefs.forEach = jest.genMockFunction()
    .mockImplementation((cb) => {
      cb(fakeInput, fieldId);
    });
    formComponent.setState({
      isValid: false,
      inputValidations: {
        0: { // fieldId
          valid: false,
          validationError: "some error"
        }
      }
    });
    formComponent.setState = jest.genMockFunction();
    formComponent.handleChange("", {
      props: {
        fieldId: fieldId
      }
    })
    expect(formComponent.setState).toBeCalledWith({
      inputValidations: {
        0: {
          valid: true,
          validationError: ""
        }
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
    expect(fieldComponent.props.error).toBe("Field Must Not Be Empty");
    const textInputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);
    TestUtils.Simulate.change(textInputNode, {target:{value: ""}});
    expect(fieldComponent.props.status).toBe(undefined);
    expect(fieldComponent.props.error).toBe("");
  });

  it("Does not update state when a Field is changed before being validated", () => {
    const formComponent = TestUtils.renderIntoDocument(
        <Form>
            <Field
                required={true}
            >
                <TextInput />
            </Field>
        </Form>
    );
    formComponent.setState = jest.genMockFunction();
    formComponent.handleChange("", {});
    expect(formComponent.setState).not.toBeCalled();
  });

  it("Does return Field data when submit button is clicked", () => {
    let mockHandleSubmit = jest.genMockFunction();
    const formComponent = TestUtils.renderIntoDocument(
        <Form onSubmit={mockHandleSubmit}>
            <Field fieldKey={"text"}>
                <TextInput initialValue={"yes"}/>
            </Field>
        </Form>
    );
    const submitButtonNode = ReactDOM.findDOMNode(formComponent.submitButtonRef);
    TestUtils.Simulate.click(submitButtonNode);
    expect(mockHandleSubmit).toBeCalledWith({
      text: "yes"
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
              type: type,
              title: title,
              details: details,
              children: <div>{"Hello"}</div>
            }}
        />
    );
    expect(formComponent.alertRef.props.type).toBe(type);
    expect(formComponent.alertRef.props.title).toBe(title);
    expect(formComponent.alertRef.props.details).toBe(details);
    expect(formComponent.alertRef.props.children).not.toBeUndefined();
  });
});
