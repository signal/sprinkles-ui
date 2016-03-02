import React from "react";
import loremIpsum from "lorem-ipsum";
import TextInput from "../../src/components/TextInput";


describe("TextInput", function() {
  this.header(`## TextInput`); // Markdown.

  before(() => {

    this.handleChange = function (change) {
      this.props({value: change});
    }

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <TextInput
            handleChange={this.handleChange.bind(this)}
            value={"Some Text..."}
        />
    );
  });

  it("Update value", () => this.props({value: loremIpsum()}));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  An TextInput Element

  #### API

  - **handleChange** *React.PropTypes.func* (optional) callback to handle text changes, no setting this makes the input read only
  - **value** *React.PropTypes.string* (optional) starting text value

  `);
});
