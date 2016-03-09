// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Field");
jest.dontMock("../src/components/TextInput");
jest.dontMock("../src/components/Text");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Field = require("../src/components/Field").default;
const TextInput = require("../src/components/TextInput").default;


describe("Field", () => {

  it("Does render a Field with an input", () => {
    const text = "howdy";

    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field />
    );

    // grab the DOM node so we can inspect it
    const fieldNode = ReactDOM.findDOMNode(fieldComponent);

    expect(fieldNode.textContent).toEqual("");

  });

  it("Does render a Field with a label", () => {
    const text = "howdy";

    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field label={text}/>
    );

    // grab the DOM node so we can inspect it
    const labelRef = ReactDOM.findDOMNode(fieldComponent.labelRef);

    expect(labelRef.textContent).toEqual(text);
  });

  it("Does render a Field with an error status", () => {
    const text = "howdy";

    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field
            label={text}
            status={"error"}
        >
            <TextInput />
        </Field>
    );

    // grab the label and input DOM nodes so we can inspect them
    const labelNode = ReactDOM.findDOMNode(fieldComponent.labelRef);
    const inputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);

    expect(labelNode.style.color).toBe("red");
    expect(inputNode.style.boxShadow).toBe("0 0 3px 1px red")
  });

  it("Does render a Field with a warning status", () => {
    const text = "howdy";

    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field
            label={text}
            status={"warning"}
        >
            <TextInput />
        </Field>
    );

    // grab the label and input DOM nodes so we can inspect them
    const labelNode = ReactDOM.findDOMNode(fieldComponent.labelRef);
    const inputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);

    expect(labelNode.style.color).toBe("orange");
    expect(inputNode.style.boxShadow).toBe("0 0 3px 1px orange")
  });

  it("Does render a Field with a success status", () => {
    const text = "howdy";

    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field
            label={text}
            status={"success"}
        >
            <TextInput />
        </Field>
    );

    // grab the label and input DOM nodes so we can inspect them
    const labelNode = ReactDOM.findDOMNode(fieldComponent.labelRef);
    const inputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);

    expect(labelNode.style.color).toBe("green");
    expect(inputNode.style.boxShadow).toBe("0 0 3px 1px green")
  });

  it("Does render a Field with an error message", () => {
    const errMessage = "Some error occured";

    const fieldComponent = TestUtils.renderIntoDocument(
        <Field error={errMessage} />
    );

    const errorNode = ReactDOM.findDOMNode(fieldComponent.errorRef);

    expect(errorNode.textContent).toBe(errMessage);
  });

  it("Does validate a Field with input missing isValid function", () => {
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field/>
    );

    expect(fieldComponent.isValid()).toBe(true);
  });

  it("Does validate a Field with a valid TextInput", () => {
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field>
            <TextInput initialValue={"a"} />
        </Field>
    );

    expect(fieldComponent.isValid()).toBe(true);
  });

  it("Does validate a Field with an invalid TextInput", () => {
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field>
            <TextInput initialValue={""} />
        </Field>
    );

    expect(fieldComponent.isValid()).toBe(false);
  });
});
