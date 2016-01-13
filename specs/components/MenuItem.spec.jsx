import React from "react";
import loremIpsum from "lorem-ipsum";
import MenuItem from "../../src/components/MenuItem";


describe("MenuItem", function() {
  this.header(`## MenuItem`); // Markdown.

  before(() => {
    function handleClick() {
      console.log('click!');
    }

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load( <MenuItem
        color="blue"
        text={ loremIpsum() }
        handleClick={ handleClick }
      />
    );
  });

  it("Update Text", () => this.props({ text: loremIpsum() }));

  it("Style 1", () => this.props({ style: {}}));
  it("Style 2", () => this.props({ style: {background: "#4183F0", color: "white"}}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### MenuItem
  `);
});
