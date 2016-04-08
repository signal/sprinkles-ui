// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/KeyValueInput");
jest.dontMock("../src/components/TextInput");
jest.dontMock("../src/components/Button");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const KeyValueInput = require("../src/components/KeyValueInput").default;


describe("KeyValueInput", () => {
  it("Does render a KeyValueInput", () => {
    // Render a KeyValueInput with no style
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    expect(keyValueInputComponent).toBeDefined();
  });

  it("Does render an empty KeyValueInput", () => {
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: "",
      value: ""
    }]);
  });

  it("Does update key when key input changes", () => {
    const newKey = "new key";
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    TestUtils.Simulate.change(keyInputNode, {target:{value: newKey}});
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: newKey,
      value: ""
    }]);
  });

  it("Does update value when value input changes", () => {
    const newValue = "new value";
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    TestUtils.Simulate.change(valueInputNode, {target:{value: newValue}});
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: "",
      value: newValue
    }]);
  });

  it("Does add new key value pair when add button is clicked", () => {
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    TestUtils.Simulate.click(addButtonNode);
    expect(keyValueInputComponent.state.value.toJS()).toEqual([
      {
        key: "",
        value: ""
      },{
        key: "",
        value: ""
      }
    ]);
  });

  it("Does set initialValue of key value pairs", () => {
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    },{
      key: "key 2",
      value: "value 2"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput initialValue={initialValue}/>
    );
    expect(keyValueInputComponent.state.value.toJS()).toEqual(initialValue);
  });

  it("Does delete a key value pair when delete button is clicked", () => {
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    },{
      key: "key 2",
      value: "value 2"
    },{
      key: "key 3",
      value: "value 3"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput initialValue={initialValue}/>
    );
    const deleteButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.deleteButtonRef1);
    TestUtils.Simulate.click(deleteButtonNode);
    expect(keyValueInputComponent.state.value.toJS()).toEqual([
      {
        key: "key 1",
        value: "value 1"
      },
      {
        key: "key 3",
        value: "value 3"
      }
    ]);
  });
});
