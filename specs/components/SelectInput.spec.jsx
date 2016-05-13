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
        value: "thing-1",
        label: "Thing 1",
      }, {
        value: "thing-2",
        label: "Thing 2",
      }, {
        value: "thing-3",
        label: "Thing 3",
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
