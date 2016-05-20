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
      .toBe("42px");
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
      .toBe("1px");
    expect(switchNode.style.left)
      .toBe("0px");
    expect(switchNode.style.width)
      .toBe("24px");
    expect(switchNode.style.height)
      .toBe("24px");
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
    expect(toggleInputNode.style.border)
      .toBe(`1px solid ${Colors.success.toLowerCase()}`);
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(switchNode.style.left)
      .toBe("18px");
  });

  it("does toggle the value with the ToggleInput is clicked", () => {
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput />
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    TestUtils.Simulate.click(toggleInputNode);
    expect(toggleInputComponent.state.value).toBe(true);
  });

  it("does render a disabled ToggleInput", () => {
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput enabled={false} />
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(BackgroundColors.secondary);
    expect(toggleInputNode.style.cursor)
      .toBe("not-allowed");
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(color(switchNode.style.background).hexString())
      .toBe(BackgroundColors.secondary);
    TestUtils.Simulate.click(toggleInputNode);
    expect(toggleInputComponent.state.value).toBe(false);
  });

  it("does disable a ToggleInput who's value=true", () => {
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput
        enabled={false}
        initialValue={true}
      />
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(color(Colors.success).lighten(0.4).hexString());
    expect(toggleInputNode.style.border)
      .toBe(`1px solid ${color(Colors.success).lighten(0.4).hexString().toLowerCase()}`);
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(color(switchNode.style.background).hexString())
      .toBe(BackgroundColors.secondary);
  });

  it("does trigger an onChange event when the value changes", () => {
    const mockHandleChange = jest.fn();
    const toggleInputComponent = TestUtils.renderIntoDocument(
      <ToggleInput
        onChange={mockHandleChange}
      />
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    TestUtils.Simulate.click(toggleInputNode);
    expect(mockHandleChange).toBeCalledWith(true);
  });
});
