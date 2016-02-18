import React from "react";
import loremIpsum from "lorem-ipsum";
import Popover from "../../src/components/Popover";


describe("Popover", function() {
  this.header(`## Popover`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Popover>{loremIpsum()}</Popover>
    );
  });

    /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A Popver element

  #### API

  - **children** *React.PropTypes.node* (optional) child components

  `);
});
