/* eslint func-names: "off" */

import React from "react";
import NavBar from "../../src/components/NavBar";

describe("NavBar", function () {
  this.header(`
  ## NavBar
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <NavBar />
    ).width("100%");
  });

  it("Fixed position", () => this.props({ position: "fixed" }));
  it("Relative position", () => this.props({ position: undefined }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### NavBar

  Top Navigation Bar

  #### API

  - coming soon

  `);
});
