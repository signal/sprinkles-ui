// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/TextInput");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import Colors from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const TextInput = require("../src/components/TextInput").default;



describe("TextInput", () => {

  it("Does render an TextInput with default text", () => {
    const text = "howdy";

    // Render an TextInput
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            initialValue={text}
        />
    );

    // grab the DOM node so we can inspect it
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    // Verify that it"s rendered with the right text
    // NOTE: This will ALWAYS grab the value at initialization time
    //       Use the 'value' property if you're looking for the text value
    expect(textInputNode.getAttribute("value")).toEqual(text);
    expect(textInputNode.getAttribute("autocomplete")).toBe("on");
  });

  it("Does render an editable input", () => {
    const changedText = "howdy";

    const handleChange = jest.genMockFunction();

    // Render an editable TextInput
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            initialValue={""}
            onChange={handleChange}
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

    expect(textInputNode.style.boxShadow).toBe("0 0 3px 1px " + Colors.danger);
  });

  it("Does render with an orange shadow on warning status", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            status={"warning"}
        />
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    expect(textInputNode.style.boxShadow).toBe("0 0 3px 1px " + Colors.warning);
  });

  it("Does render with a green shadow on success status", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            status={"success"}
        />
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    expect(textInputNode.style.boxShadow).toBe("0 0 3px 1px " + Colors.success);
  });

  it("Does return invalid state with empty TextInput", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput />
    );

    expect(textInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: "Field Must Not Be Empty"
    });
  });

  it("Does return valid state when TextInput has a value", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput initialValue={"a"} />
    );

    expect(textInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: ""
    });
  });

  it("Does return valid state and not initial state when input changes", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput />
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    expect(textInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: "Field Must Not Be Empty"
    });

    TestUtils.Simulate.change(textInputNode, {target:{value: "a"}});

    expect(textInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: ""
    });
  });

  it("Does return invalid state and not initial state when input changes", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput initialValue={"a"}/>
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    expect(textInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: ""
    });

    TestUtils.Simulate.change(textInputNode, {target:{value: ""}});

    expect(textInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: false,
      validationError: "Field Must Not Be Empty"
    });
  });

  it("Does disable autocomplete on inputbox", () => {
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput autoComplete={false}/>
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputNode.getAttribute("autocomplete")).toBe("off");
  });
});
