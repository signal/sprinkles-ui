import React from "react";
import loremIpsum from "lorem-ipsum";
import Text from "../../src/components/Text";


describe("Text", function() {
  this.header(`## Text`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Text text={loremIpsum()}/>
    );
  });

  it("Update Text", () => this.props({ text: loremIpsum() }));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A Text Element

  #### API

  - **text** *React.PropTypes.string* (optional) display text

  `);
});
