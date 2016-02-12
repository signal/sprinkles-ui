import React from "react";
import loremIpsum from "lorem-ipsum";
import Text from "../../src/components/Text";


describe("Text", function() {
  this.header(`## Text`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Text>{loremIpsum()}</Text>
    );
  });

  // Thanks Paul Irish: http://www.paulirish.com/2009/random-hex-color-code-snippets/
  it("Update Color", () => this.props({
    color: "#" + Math.floor(Math.random()*16777215).toString(16)
  }));

  it("Increase Font Size", () => {
    var curFontSize = this.props() && this.props().fontSize
      ? this.props().fontSize : 12;
    this.props({
      fontSize: Math.min(curFontSize + 1, 36)
    })
  });

  it("Decrease Font Size", () => {
    var curFontSize = this.props() && this.props().fontSize
      ? this.props().fontSize : 12;
    this.props({
      fontSize: Math.max(curFontSize - 1, 8)
    })
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A Text Element

  #### API

  - **color** *React.PropTypes.string* (optional) text color
  - **fontSize** *React.PropTypes.string* (optional) text size

  `);
});
