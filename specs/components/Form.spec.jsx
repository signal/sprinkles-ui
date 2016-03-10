import React from "react";
import loremIpsum from "lorem-ipsum";
import Form from "../../src/components/Form";

describe("Form", function() {
  this.header(`## Form`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Form />
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
