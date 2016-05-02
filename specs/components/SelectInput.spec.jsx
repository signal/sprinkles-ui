/* eslint func-names: "off" */

import React from "react";
import SelectInput from "../../src/components/SelectInput";


describe("SelectInput", function () {
  this.header(`
  ## SelectInput
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <SelectInput items={[{
        key: "key",
        value: "value",
      }]}
      />
    ).width(200);
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### SelectInput

  A SelectInput Element

  #### API
  - coming soon
  `);
});
