// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/SecondaryNav");

import React from "react";
// import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const SecondaryNav = require("../src/components/SecondaryNav").default;

describe("List", () => {
  it("does render a NavBar", () => {
    const secNavComponent = TestUtils.renderIntoDocument(
      <SecondaryNav />
    );
    expect(secNavComponent).toBeDefined();
  });
});
