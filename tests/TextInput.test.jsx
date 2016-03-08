// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/TextInput");
jest.dontMock("reactcss");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const TextInput = require("../src/components/TextInput").default;


describe("TextInput", () => {

  it("Does render an TextInput with default text", () => {
    const text = "howdy";

    // Render an TextInput
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            valueLink={{value: text}}
        />
    );

    // grab the DOM node so we can inspect it
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    // Verify that it"s rendered with the right text
    // NOTE: This will ALWAYS grab the value at initialization time
    //       Use the 'value' property if you're looking for the text value
    expect(textInputNode.getAttribute("value")).toEqual(text);

  });

  it("Does render an editable input", () => {
    const changedText = "howdy";

    const handleChange = jest.genMockFunction();

    // Render an editable TextInput
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            valueLink={{
              value: "",
              requestChange: handleChange
            }}
        />
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    TestUtils.Simulate.change(textInputNode, {target:{value: changedText}});

    expect(handleChange).toBeCalledWith(changedText);

  });

  it("Does set isFocused when component is in focus", function () {
    // Render an editable TextInput
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput />
    );

    textInputComponent.setState = jest.genMockFunction();

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputComponent.setState).not.toBeCalled();

    TestUtils.Simulate.focus(textInputNode);

    expect(textInputComponent.setState).toBeCalledWith({isFocused: true});

    TestUtils.Simulate.blur(textInputNode);
    expect(textInputComponent.setState).toBeCalledWith({isFocused: false});
  });

  it("Does render with a placeholder", () => {
    const placeholder = "placeholder";
    // Render an editable TextInput
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            placeholder={placeholder}
        />
    );

    // grab the DOM node so we can inspect it
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    expect(textInputNode.getAttribute("placeholder")).toBe(placeholder);
  });

  it("Does render with red shadow on error status", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            status={"error"}
        />
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    expect(textInputNode.style.boxShadow).toBe("0 0 3px 1px red");
  });

  it("Does render with an orange shadow on warning status", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            status={"warning"}
        />
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    expect(textInputNode.style.boxShadow).toBe("0 0 3px 1px orange");
  });

  it("Does render with a green shadow on success status", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            status={"success"}
        />
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    expect(textInputNode.style.boxShadow).toBe("0 0 3px 1px green");
  });
});
