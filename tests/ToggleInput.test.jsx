// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/ToggleInput");
jest.dontMock("../src/shared/colors");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";
import {
  BackgroundColors,
  Colors,
  StructuralColors,
} from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const ToggleInput = require("../src/components/ToggleInput").default;


describe("ToggleInput", () => {
  it("does render a ToggleInput", () => {
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput />
    );
    expect(toggleInputComponent).toBeDefined();
  });

  it("does render a ToggleInput with expected style", () => {
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput />
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(toggleInputNode.style.border)
      .toBe(`1px solid ${StructuralColors.inputBorder.toLowerCase()}`);
    expect(toggleInputNode.style.width)
      .toBe("52px");
    expect(toggleInputNode.style.height)
      .toBe("26px");
    expect(toggleInputNode.style.borderRadius)
      .toBe("13px");
    expect(toggleInputNode.style.position)
      .toBe("relative");
    expect(toggleInputNode.style.cursor)
      .toBe("pointer");
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(BackgroundColors.primary);
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(switchNode.style.position)
      .toBe("absolute");
    expect(switchNode.style.top)
      .toBe("-1px");
    expect(switchNode.style.left)
      .toBe("-1px");
    expect(switchNode.style.width)
      .toBe("26px");
    expect(switchNode.style.height)
      .toBe("26px");
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(BackgroundColors.primary);
    expect(toggleInputNode.style.borderRadius)
      .toBe("13px");
    expect(toggleInputNode.style.border)
      .toBe(`1px solid ${StructuralColors.inputBorder.toLowerCase()}`);
  });

  it("does render ToggleInput with initialValue=true", () => {
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput initialValue={true} />
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(Colors.success);
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(switchNode.style.left)
      .toBe("26px");
  });

  it("does toggle the value with the ToggleInput is clicked", () => {
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput />
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    TestUtils.Simulate.click(toggleInputNode);
    expect(toggleInputComponent.state.value).toBe(true);
  });
});
