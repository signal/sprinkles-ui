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
        <TextInput value={text} />
    );

    // grab the DOM node so we can inspect it
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    // Verify that it"s rendered with the right text
    // NOTE: This will ALWAYS grab the value at initialization time
    //       Use the 'value' property if you're looking for the text value
    expect(textInputNode.getAttribute("value")).toEqual(text);

  });

  it("Does render an editable input", () => {
    const text = "howdy";
    const changedText = "howdyA";

    const handleChange = jest.genMockFunction();

    // Render an editable TextInput
    const textInputComponent = TestUtils.renderIntoDocument(
        <TextInput
            handleChange={handleChange}
            value={text}
        />
    );

    const textInputNode = ReactDOM.findDOMNode(textInputComponent);

    TestUtils.Simulate.change(textInputNode, {target:{value: changedText}});

    expect(handleChange).toBeCalledWith(changedText);
  });

});
