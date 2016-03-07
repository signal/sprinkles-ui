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
        >
            <TextInput/>
        </Field>
    ).width("100%");
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Field

  A Field Element

  #### API

  - **children** *React.PropTypes.node* current supported nodes: TextInput *(TODO: add more Documentation on how props passed down to children)*
  - **initialValue** *React.PropTypes.string* (optional) the initial value of the field

  `);
});
