/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from "react";
import SelectInput from "../../src/components/SelectInput";


describe("SelectInput", function () {
  this.header(`
  ## SelectInput
  `); // Markdown.

  before(() => {
    const handleChange = (value) => console.log("change: ", value);
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <SelectInput
        items={[{
          value: "thing-1",
          label: "Thing 1",
        }, {
          value: "thing-2",
          label: "Thing 2",
        }, {
          value: "thing-3",
          label: "Thing 3",
        }]}
        onChange={handleChange}
      />
    ).width(200);
  });

  it("disabled", () => this.props({ enabled: false }));
  it("enabled", () => this.props({ enabled: true }));
  it("Set Success Status", () => this.props({ status: "success" }));
  it("Set Warning Status", () => this.props({ status: "warning" }));
  it("Set Error Status", () => this.props({ status: "error" }));
  it("Clear Status", () => this.props({ status: undefined }));

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
