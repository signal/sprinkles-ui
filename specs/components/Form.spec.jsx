import React from "react";
import loremIpsum from "lorem-ipsum";
import Form from "../../src/components/Form";
import Field from "../../src/components/Field";
import TextInput from "../../src/components/TextInput";

describe("Form", function() {
  this.header(`## Form`); // Markdown.

  before(() => {
    function handleSubmit(submitData) {
      console.log("submitData", submitData);
    }
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Form onSubmit={handleSubmit}>
            <Field
                fieldKey={"firstName"}
                label={"First Name"}
                required={true}
            >
                <TextInput placeholder={"Fred"} />
            </Field>
            <Field
                fieldKey={"lastName"}
                label={"Last Name"}
                required={true}
            >
                <TextInput placeholder={"Jones"} />
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
