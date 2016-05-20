/* eslint func-names: "off" */

import React from "react";
import ToggleInput from "../../src/components/ToggleInput";


describe("ToggleInput", function () {
  this.header(`
  ## ToggleInput
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <ToggleInput />
    );
  });

  it("disable", () => this.props({ enabled: false }));
  it("enable", () => this.props({ enabled: true }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### ToggleInput

  A component that toggles a boolean value

  #### API

  - comming soon


  `);
});
