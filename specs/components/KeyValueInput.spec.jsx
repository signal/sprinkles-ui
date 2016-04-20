/* eslint func-names: "off" */

import React from "react";
import KeyValueInput from "../../src/components/KeyValueInput";


describe("KeyValueInput", function () {
  this.header(`
  ## KeyValueInput
  `); // Markdown.

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
          },
        ]}
      />
    ).width(600);
  });

  it("Key Label: My Key Label", () => this.props({ keyLabel: "My Key Label" }));
  it("Key Label: Key", () => this.props({ keyLabel: undefined }));
  it("Value Label: My Value Label", () => this.props({ valueLabel: "My Value Label" }));
  it("Value Label: Value", () => this.props({ valueLabel: undefined }));
  it("Add Button: My Add Button", () => this.props({ addButtonText: "My Add Button" }));
  it("Add Button: Add", () => this.props({ addButtonText: undefined }));
  it("Disable", () => this.props({ enabled: false }));
  it("Enable", () => this.props({ enabled: true }));
  it("Status: success", () => this.props({ status: "success" }));
  it("Status: error", () => this.props({ status: "error" }));
  it("Clear Status", () => this.props({ status: undefined }));
  it("Valid if all keys unique", () => this.props({ uniqueKeys: true }));
  it("Valid with any non-empty keys", () => this.props({ uniqueKeys: false }));


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
