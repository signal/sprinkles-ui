import React from "react";
import KeyValueInput from "../../src/components/KeyValueInput";


describe("KeyValueInput", function() {
  this.header(`## KeyValueInput`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <KeyValueInput
            initialValue={[
              {
                key: "some key",
                value: "some value",
              },
              {
                key: "some other key",
                value: "some other value",
              }
            ]}
        />
    ).width(600);
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### KeyValueInput

  A component for building key value pairs

  #### API

  - coming soon

  `);
});
