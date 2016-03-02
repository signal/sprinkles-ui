import React from "react";
import loremIpsum from "lorem-ipsum";
import Input from "../../src/components/Input";


describe("Input", function() {
  this.header(`## Input`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Input value={"Some Text..."}/>
    );
  });

  it("Update value", () => this.props({value: loremIpsum()}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  An Input Element

  #### API

  - **value** *React.PropTypes.string* (optional) starting text value

  `);
});
