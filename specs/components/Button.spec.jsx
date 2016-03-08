import React from "react";
import Button from "../../src/components/Button";

describe("Button", function() {
  this.header(`## Button`); // Markdown.

  before(() => {

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Button/>
    ).width("100%");
  });


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Button

  An Button Element

  #### API

  - **text** *React.PropTypes.string* (optional) text value

  `);
});
