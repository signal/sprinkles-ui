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
        <Field label={"Field Label"}>
            <TextInput
                initialValue={"Initial Value"}
                onChange={handleChange}
                placeholder={"placeholder"}
            />
        </Field>
    ).width("100%");
  });

  it("Clear Label", () => this.props({label: undefined}));
  it("Update Label", () => this.props({label: "Field Label"}));
  it("Set Error Status", () => this.props({status: "error"}));
  it("Set Warning Status", () => this.props({status: "warning"}));
  it("Set Success Status", () => this.props({status: "success"}));
  it("Clear Status", () => this.props({status: undefined}));
  it("Set Error Message", () => this.props({error: "Field Error Message"}));
  it("Clear Error Message", () => this.props({error: undefined}));
  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Field

  A Field Element

  #### API

  - **children** *React.PropTypes.node* current supported nodes: TextInput *(TODO: add more Documentation on how props passed down to children)*
  - **label** *React.PropTypes.string* (optional) a label to distingush the field
  - **status** *React.PropTypes.oneOf* (optional) set status of the Field. Acceptable value are 'error', 'warning' and 'success'

  `);
});
