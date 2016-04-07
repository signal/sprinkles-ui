// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/RadioButtonInput");
jest.dontMock("../src/components/Text");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import { Colors } from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const RadioButtonInput = require("../src/components/RadioButtonInput").default;



describe("RadioButtonInput", () => {

  it("Does render a RadioButtonInput", () => {
    // Render an RadioButtonInput
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput/>
    );
    expect(radioButtonInputComponent).toBeDefined();
  });

  it("Does render RadioButtonInput Items", () => {
    const items = [
      {
        name: "Name",
        value: "Value"
      }
    ];
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput items={items}/>
    );
    const radioInputs = TestUtils.scryRenderedDOMComponentsWithTag(radioButtonInputComponent, "input");
    expect(radioInputs.length).toBe(1);
    radioInputs.forEach((item, i) => {
      expect(item.name).toBe(items[i].name);
      expect(item.value).toBe(items[i].value);
    });
    const radioLabels = TestUtils.scryRenderedDOMComponentsWithTag(radioButtonInputComponent, "Text");
    radioLabels.forEach((item, i) => {
      expect(item.textContent).toBe(items[i].name);
    });
  });

  it("Does render a RadioButton input with the first item selected by default", () => {
    const items = [
      {
        name: "Name",
        value: "Value"
      },
      {
        name: "Name2",
        value: "Value2"
      }
    ];
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput items={items}/>
    );
    const radioInputs = TestUtils.scryRenderedDOMComponentsWithTag(radioButtonInputComponent, "input");
    radioInputs.forEach((item, i) => {
      if (i === 0) {
        expect(item.checked).toBe(true);
      } else {
        expect(item.checked).toBe(false);
      }
    });
  });

  it("Does change the value when the a Radio item is selected", () => {
    const items = [
      {
        name: "Name",
        value: "Value"
      },
      {
        name: "Name2",
        value: "Value2"
      }
    ];
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput items={items}/>
    );
    expect(radioButtonInputComponent.state.value).toBe("Value");
    const unSelectedRadioInputNode = ReactDOM.findDOMNode(radioButtonInputComponent.radioInputRefs[1]);
    TestUtils.Simulate.click(unSelectedRadioInputNode);
    expect(radioButtonInputComponent.state.value).toBe("Value2");
  });

  it("Does fire an onChange event when the value changes", () => {
    const items = [
      {
        name: "Name",
        value: "Value"
      },
      {
        name: "Name2",
        value: "Value2"
      }
    ];
    const mockHandleChange = jest.genMockFunction();
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput
            items={items}
            onChange={mockHandleChange}
        />
    );
    const unSelectedRadioInputNode = ReactDOM.findDOMNode(radioButtonInputComponent.radioInputRefs[1]);
    TestUtils.Simulate.click(unSelectedRadioInputNode);
    expect(mockHandleChange).toBeCalledWith("Value2");
  });

  it("Does set the initialValue of the RadioButtonInput", () => {
    const items = [
      {
        name: "Name",
        value: "Value"
      },
      {
        name: "Name2",
        value: "Value2"
      }
    ];
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput
            initialValue={"Value2"}
            items={items}
        />
    );
    expect(radioButtonInputComponent.state.value).toBe("Value2");
  });

  it("Does render a disabled RadioButtonInput", () => {
    const items = [
      {
        name: "Name",
        value: "Value"
      },
      {
        name: "Name2",
        value: "Value2"
      }
    ];
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput
            enabled={false}
            items={items}
        />
    );
    const radioInputs = TestUtils.scryRenderedDOMComponentsWithTag(radioButtonInputComponent, "input");
    radioInputs.forEach((item, i) => {
      expect(item.disabled).toBe(true);
    });
  });

  it("Does validate the RadioButtonInput", () => {
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput/>
    );
    expect(radioButtonInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: ""
    });
  });

  it("Does validate the RadioButtonInput and detect changed input", () => {
    const items = [
      {
        name: "Name",
        value: "Value"
      },
      {
        name: "Name2",
        value: "Value2"
      }
    ];
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput items={items}/>
    );
    const unSelectedRadioInputNode = ReactDOM.findDOMNode(radioButtonInputComponent.radioInputRefs[1]);
    TestUtils.Simulate.click(unSelectedRadioInputNode);
    expect(radioButtonInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: ""
    });
  });

  it("Does validate the RadioButtonInput and detect changed input with initialValue set", () => {
    const items = [
      {
        name: "Name",
        value: "Value"
      },
      {
        name: "Name2",
        value: "Value2"
      }
    ];
    const radioButtonInputComponent = TestUtils.renderIntoDocument(
        <RadioButtonInput
            initialValue={"Value2"}
            items={items}
        />
    );
    const unSelectedRadioInputNode = ReactDOM.findDOMNode(radioButtonInputComponent.radioInputRefs[0]);
    TestUtils.Simulate.click(unSelectedRadioInputNode);
    expect(radioButtonInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: ""
    });
  });
});
