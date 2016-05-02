// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/Breadcrumbs");
jest.dontMock("../src/components/Text");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

// TODO: move this to es6 style import when its implemented in jest
const Breadcrumbs = require("../src/components/Breadcrumbs").default;

describe("Breadcrumbs", () => {
  it("Does render a Breadcrumbs Component", () => {
    const breadcrumbsComponent = TestUtils.renderIntoDocument(
      <Breadcrumbs />
    );
    expect(breadcrumbsComponent).toBeDefined();
  });

  it("Does render a path", () => {
    const path = [
      {
        display: "Level 1",
        url: "/lvl-1",
      },
      {
        display: "Level 2",
        url: "/lvl-1/lvl-2",
      },
      {
        display: "Level 3",
        url: "/lvl-1/lvl-2/lvl-3",
      },
    ];
    const breadcrumbsComponent = TestUtils.renderIntoDocument(
      <Breadcrumbs path={path} />
    );
    const breadcrumbsNode = ReactDOM.findDOMNode(breadcrumbsComponent);
    expect(breadcrumbsNode.textContent).toBe("Level 1 / Level 2 / Level 3");
  });
});
