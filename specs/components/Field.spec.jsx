import React from "react";
import loremIpsum from "lorem-ipsum";
import Field from "../../src/components/Field";
import TextInput from "../../src/components/TextInput";

describe("Field", function() {
  this.header(`## Field`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Field
            initialValue={"Initial Value"}
            label={"Field Label"}
        >
            <TextInput placeholder={"placeholder"}/>
        </Field>
    ).width("100%");
  });


  it("Clears Label", () => this.props({label: undefined}));
  it("Updates Label", () => this.props({label: "Field Label"}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Field

  A Field Element

  #### API

  - **children** *React.PropTypes.node* current supported nodes: TextInput *(TODO: add more Documentation on how props passed down to children)*
  - **initialValue** *React.PropTypes.string* (optional) the initial value of the field
  - **label** *React.PropTypes.string* (optional) a label to distingush the field

  `);
});
