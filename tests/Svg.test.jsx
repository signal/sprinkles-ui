// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Svg");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Svg = require("../src/components/Svg").default;

describe("Svg", () => {
  it("Does render a SVG element", () => {
    const svgSquare = TestUtils.renderIntoDocument(
        <Svg
            type="square"
        />
    );

    const svgSquareNode = ReactDOM.findDOMNode(svgSquare);

    expect(svgSquareNode.nodeName).toEqual("svg");
  });
});
