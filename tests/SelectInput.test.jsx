// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/SelectInput");
jest.dontMock("../src/components/TextListItem");
jest.dontMock("../src/components/Text");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";
import { BackgroundColors, StructuralColors } from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const SelectInput = require("../src/components/SelectInput").default;

describe("SelectInput", () => {
  it("Does render a SelectInput with default text", () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput />
    );
    expect(selectInputComponent).toBeDefined();
  });

  it("Does render a SelectInput with no selection state ", () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput />
    );
    const selectInputNode = ReactDOM.findDOMNode(selectInputComponent);
    expect(selectInputNode.style.border)
      .toBe(`1px solid ${StructuralColors.divider.toLowerCase()}`);
    const displayNode = ReactDOM.findDOMNode(selectInputComponent.displayRef);
    expect(displayNode.textContent).toBe("--");
    expect(color(displayNode.style.background).hexString()).toBe(BackgroundColors.primary);
  });
});
