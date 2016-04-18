/* eslint func-names: "off" */
/* eslint no-console: "off" */
/* eslint max-len: "off" */

import React from "react";
import RadioButtonInput from "../../src/components/RadioButtonInput";


describe("RadioButtonInput", function () {
  this.header(`
  ## RadioButtonInput
  `); // Markdown.

  before(() => {
    const handleChange = (newValue) => console.log("New Value:", newValue);
    const items = [
      {
        name: "name1",
        value: "item1",
      },
      {
        name: "name2",
        value: "item2",
      },
    ];
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <RadioButtonInput
        items={items}
        onChange={handleChange}
      />
    );
  });

  it("Value (output on console)", () =>
    console.log("Current Value: ", UIHarness.component.value()));
  it("Validate (output on console)", () =>
    console.log("Is Valid: ", UIHarness.component.validate()));
  it("Disable", () => this.props({ enabled: false }));
  it("Enable", () => this.props({ enabled: true }));
  it("Set Success Status", () => this.props({ status: "success" }));
  it("Set Warning Status", () => this.props({ status: "warning" }));
  it("Set Error Status", () => this.props({ status: "error" }));
  it("Clear Status", () => this.props({ status: undefined }));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A RadioButtonInput Element

  #### API
  - **enabled** *React.PropTypes.bool* (optional) enable/disable user input
  - **initialValue** *React.PropTypes.string* (optional) initial value of the radio button group
  - **onChange** *React.PropTypes.func* (optional) callback called when the value of the radio button group changes
  - **status** *React.PropTypes.oneOf* (optional) set status of the RadioButtonInput. Acceptable value are 'error', 'warning' and 'success'
  `);
});
