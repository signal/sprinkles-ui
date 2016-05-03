/* eslint func-names: "off" */

import React from "react";
import Dropdown from "../../src/components/Dropdown";

describe("Dropdown", function () {
  this.header(`
  ## Dropdown
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <Dropdown />
    ).width("100%");
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Dropdown

  A dropdown component

  #### API

  - coming soon

  `);
});
