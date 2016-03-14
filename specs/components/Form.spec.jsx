import React from "react";
import loremIpsum from "lorem-ipsum";
import Form from "../../src/components/Form";
import Field from "../../src/components/Field";
import TextInput from "../../src/components/TextInput";

describe("Form", function() {
  this.header(`## Form`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Form>
            <Field label={"First Name"}>
                <TextInput/>
            </Field>
            <Field label={"Last Name"}>
                <TextInput/>
            </Field>
        </Form>
    ).width("100%");
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Form

  A Form Element

  #### API

  - Comming soon

  `);
});
