// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/ToggleInput");

import React from "react";
// import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const ToggleInput = require("../src/components/ToggleInput").default;


describe("ToggleInput", () => {
  it("does render a ToggleInput", () => {
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput />
    );
    expect(toggleInputComponent).toBeDefined();
  });
});
