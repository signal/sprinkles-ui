jest.dontMock("../src/components/ButtonGroup");
jest.dontMock("../src/components/Button");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

const ButtonGroup = require("../src/components/ButtonGroup").default;
const Button = require("../src/components/Button").default;

describe("ButtonGroup", () => {
  it("Does render an empty ButtonGroup", () => {
    const component = TestUtils.renderIntoDocument(
        <ButtonGroup />
    );
    expect(component).toBeDefined();
  });

  it("Does render a button group with child buttons", () => {
    const component = TestUtils.renderIntoDocument(
        <ButtonGroup>
          <Button buttonKey={"1"} />
          <Button buttonKey={"2"} />
          <Button buttonKey={"3"} />
        </ButtonGroup>
    );
    ["1", "2", "3"].forEach((buttonRef) => {
      expect(component.buttonRefs.get(buttonRef)).toBeDefined();
    });
  });

  it("Does throw an error if Button doesn't have buttonKey prop", () => {
    expect(() => TestUtils.renderIntoDocument(
        <ButtonGroup>
          <Button buttonKey={"1"} />
          <Button />
          <Button buttonKey={"3"} />
        </ButtonGroup>
    )).toThrow(new Error("Button missing buttonKey prop"));
  });

  it("Does throw an error if a buttonKey prop is not unique", () => {
    expect(() => TestUtils.renderIntoDocument(
        <ButtonGroup>
          <Button buttonKey={"1"} />
          <Button buttonKey={"1"} />
          <Button buttonKey={"3"} />
        </ButtonGroup>
    )).toThrow(new Error("buttonKey prop \"1\" is not unique"));
  });

  it("Does trigger onClick when a button is clicked", () => {
    const buttonKey = "1";
    const mockHandleClick = jest.genMockFunction();
    const component = TestUtils.renderIntoDocument(
        <ButtonGroup onClick={mockHandleClick}>
          <Button buttonKey={buttonKey} />
        </ButtonGroup>
    );
    const buttonNode = ReactDOM.findDOMNode(component.buttonRefs.get(buttonKey));
    TestUtils.Simulate.click(buttonNode);
    expect(mockHandleClick).toBeCalledWith(buttonKey);
  });
});
