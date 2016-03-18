import React from "react";
import loremIpsum from "lorem-ipsum";
import Field from "../../src/components/Field";
import TextInput from "../../src/components/TextInput";

describe("Field", function() {
  this.header(`## Field`); // Markdown.

  before(() => {
    function handleChange(newValue) {
      console.log("newValue", newValue);
    };

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Field
            label={"Field Label"}
            onChange={handleChange}
        >
            <TextInput
                initialValue={"Initial Value"}
                placeholder={"placeholder"}
            />
        </Field>
    ).width("100%");
  });

  it("Validate (output on console)", () => console.log("Is Valid: ", UIHarness.component.validate()));
  it("Clear Label", () => this.props({label: undefined}));
  it("Update Label", () => this.props({label: "Field Label"}));
  it("Set Error Status", () => this.props({status: "error"}));
  it("Set Warning Status", () => this.props({status: "warning"}));
  it("Set Success Status", () => this.props({status: "success"}));
  it("Clear Status", () => this.props({status: undefined}));
  it("Set Error Message", () => this.props({error: "Field Error Message"}));
  it("Clear Error Message", () => this.props({error: undefined}));
  it("Set Required", () => this.props({required: true}));
  it("Remove Required", () => this.props({required: false}));
  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Field

  A Field Element

  #### API

  - **children** *React.PropTypes.node* current supported nodes: TextInput *(TODO: add more Documentation on how props passed down to children)*
  - **error** *React.PropTypes.string* (optional) an error message that is displayed with the Field
  - **label** *React.PropTypes.string* (optional) a label to distingush the field
  - **onChange** *React.PropTypes.func* (optional) called when the input changes
  - **required** *React.PropTypes.bool* (optional) field is required (or not) to be in a valid state before it can be submitted
  - **status** *React.PropTypes.oneOf* (optional) set status of the Field. Acceptable value are 'error', 'warning' and 'success'

  `);
});
