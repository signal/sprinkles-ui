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
            placeholder={"Placeholder"}
        />
    ).width("100%");
  });

  it("Update value", () => this.props({value: loremIpsum()}));
  it("Clear value", () => this.props({value: undefined}));
  it("Update placeholder", () => this.props({placeholder: loremIpsum()}));
  it("Clear placeholder", () => this.props({placeholder: undefined}));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  An TextInput Element

  #### API

  - **handleChange** *React.PropTypes.func* (optional) callback to handle text changes, no setting this makes the input read only
  - **placeholder** *React.PropTypes.string* (optional) placeholder when text is empty
  - **value** *React.PropTypes.string* (optional) text value

  `);
});
