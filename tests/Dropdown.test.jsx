// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Dropdown");

import React from "react";
// import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Dropdown = require("../src/components/Dropdown").default;


describe("Dropdown", () => {
  it("Does render a Dropdown", () => {
    const dropdownComponent = TestUtils.renderIntoDocument(
        <Dropdown />
    );
    expect(dropdownComponent).toBeDefined();
  });
});
