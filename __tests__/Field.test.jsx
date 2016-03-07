// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Field");
jest.dontMock("../src/components/TextInput");
jest.dontMock("reactcss");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Field = require("../src/components/Field").default;
const TextInput = require("../src/components/TextInput").default;


describe("Field", () => {

  it("Does render an Field with TextInput", () => {
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
});
