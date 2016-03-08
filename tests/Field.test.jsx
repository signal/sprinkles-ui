// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Field");
jest.dontMock("../src/components/TextInput");
jest.dontMock("../src/components/Text");
jest.dontMock("reactcss");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Field = require("../src/components/Field").default;
const TextInput = require("../src/components/TextInput").default;


describe("Field", () => {

  it("Does render a Field", () => {
    const text = "howdy";

    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field
            initialValue={text}
        >
            <TextInput />
        </Field>
    );

    // grab the DOM node so we can inspect it
    const fieldNode = ReactDOM.findDOMNode(fieldComponent);

    // Verify that it"s rendered with the right text
    // NOTE: This will ALWAYS grab the value at initialization time
    //       Use the 'value' property if you're looking for the text value
    expect(fieldNode.children[0].getAttribute("value")).toEqual(text);

  });

  it("Does render a Field with a label", () => {
    const text = "howdy";

    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
        <Field
            label={text}
        >
            <TextInput />
        </Field>
    );

    // grab the DOM node so we can inspect it
    const fieldNode = ReactDOM.findDOMNode(fieldComponent);

    expect(fieldNode.textContent).toEqual(text);
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
});
