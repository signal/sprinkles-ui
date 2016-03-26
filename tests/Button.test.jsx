// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Button");
jest.dontMock("reactcss");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import { ButtonColors } from "../src/shared/colors";
import Color from "color";

// TODO: move this to es6 style import when its implemented in jest
const Button = require("../src/components/Button").default;

describe("Button", () => {
  it("Does render a Button with default text", () => {
    const text = "Submit";
    // Render a Button
    const buttonComponent = TestUtils.renderIntoDocument(
        <Button />
    );
    // grab the DOM node so we can inspect it
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.innerHTML).toEqual(text);
  });

  it("Does disable Button when working is true", () => {
    const buttonComponent = TestUtils.renderIntoDocument(
        <Button working={true} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.attributes.hasOwnProperty("disabled")).toEqual(true);
  });

  it("Does not disable Button when working is false", () => {
    const buttonComponent = TestUtils.renderIntoDocument(
        <Button working={false} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.attributes.hasOwnProperty("disabled")).toEqual(false);
  });

  it("Does not disable Button when enabled is true", () => {
    const buttonComponent = TestUtils.renderIntoDocument(
        <Button enabled={true} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.attributes.hasOwnProperty("disabled")).toEqual(false);
  });

  it("Does disable Button when enabled is false", () => {
    const buttonComponent = TestUtils.renderIntoDocument(
        <Button enabled={false} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.attributes.hasOwnProperty("disabled")).toEqual(true);
  });

  it("Does render a button of each type", () => {
    ["secondary", "primary", "danger", "warning", "success", "info"].forEach((type) => {
      const buttonComponent = TestUtils.renderIntoDocument(
          <Button type={type}/>
      );
      // grab the DOM node so we can inspect it
      const buttonNode = ReactDOM.findDOMNode(buttonComponent);
      expect(Color(buttonNode.style.background).hexString()).toBe(ButtonColors[type]);
      expect(Color(buttonNode.style["border-bottom-color"]).hexString())
        .toBe(Color(ButtonColors[type]).darken(0.2).hexString());
    });
  });
});
