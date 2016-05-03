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
      <Dropdown
        items={[
          {
            key: "thing1",
            value: "Thing 1",
          },
          {
            key: "thing2",
            value: "Thing 2",
          },
        ]}
        open={true}
      />
    );
  });

  it("Close Dropdown", () => this.props({ open: false }));
  it("Open Dropdown", () => this.props({ open: true }));

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
