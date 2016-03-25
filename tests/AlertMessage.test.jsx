// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/AlertMessage");
jest.dontMock("../src/components/Text");
jest.dontMock("colors");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import color from "color";
import colors from "../src/shared/colors";

// TODO: move this to es6 style import when its implemented in jest
const AlertMessage = require("../src/components/AlertMessage").default;

function testColor(messageType) {
  let colorToTest;
  const alertMessageComponent = TestUtils.renderIntoDocument(
      <AlertMessage
          details="Some description"
          type={messageType}
      />
  );
  switch(messageType) {
    case "success":
      colorToTest = colors.success;
    break;
    case "info":
      colorToTest = colors.info;
    break;
    case "warning":
      colorToTest = colors.warning;
    break;
    case "danger": colors.danger;
      colorToTest = colors.danger;
    break;
  }
  const alertMessageNode = ReactDOM.findDOMNode(alertMessageComponent);
  expect(color(alertMessageNode.style.backgroundColor).hexString()).toBe(colorToTest);
}

describe("Alert Message", () => {
  it("Does render an info Alert Message with description", () => {
    const description = "An info message";
    const alertMessageComponent = TestUtils.renderIntoDocument(
        <AlertMessage
            details={description}
            type="info"
        />
    );
    const detailsNode = ReactDOM.findDOMNode(alertMessageComponent.detailsRef);
    expect(detailsNode.textContent).toBe(description);
  });

  it("Does render an info Alert Message with description and title", () => {
    const description = "An info message";
    const title = "Info title"
    const alertMessageComponent = TestUtils.renderIntoDocument(
        <AlertMessage
            details={description}
            title={title}
            type="info"
        />
    );
    const titleNode = ReactDOM.findDOMNode(alertMessageComponent.titleRef);
    const detailsNode = ReactDOM.findDOMNode(alertMessageComponent.detailsRef);
    expect(detailsNode.textContent).toBe(description);
    expect(titleNode.textContent).toBe(title);
  });
  it("Displays the correct color for the success type", () => {
    testColor("success");
  });
  it("Displays the correct color for the info type", () => {
    testColor("info");
  });
  it("Displays the correct color for the warning type", () => {
    testColor("warning");
  });
  it("Displays the correct color for the danger type", () => {
    testColor("danger");
  });
});
