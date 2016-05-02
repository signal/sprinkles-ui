/* eslint func-names: "off" */

import React from "react";
import SecondaryNav from "../../src/components/SecondaryNav";

describe("SecondaryNav", function () {
  this.header(`
  ## SecondaryNav
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <SecondaryNav />
    ).width("100%");
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### SecondaryNav

  Top Navigation Bar

  #### API

  - coming soon

  `);
});
