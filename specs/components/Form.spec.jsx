import React from "react";
import loremIpsum from "lorem-ipsum";
import Form from "../../src/components/Form";
import Field from "../../src/components/Field";
import EmailInput from "../../src/components/EmailInput";
import PasswordInput from "../../src/components/PasswordInput";

describe("Form", function() {
  this.header(`## Form`); // Markdown.

  before(() => {
    function handleSubmit(submitData) {
      console.log("submitData", submitData);
    }
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Form
            onSubmit={handleSubmit}
            submitButtonText={"Login"}
        >
            <Field
                fieldKey={"email"}
                label={"Email"}
                required={true}
            >
                <EmailInput placeholder={"test@signal.co"} />
            </Field>
            <Field
                fieldKey={"password"}
                label={"Password"}
                required={true}
            >
                <PasswordInput placeholder={"password"} />
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

  - **onSubmit** *React.PropTypes.func* (optional) called when Form has been submitted
  - **submitButtonText** *React.PropTypes.string* (optional) set form submit button text

  `);
});
