import React from "react";
import Button from "../../src/components/Button";

describe("Button", function() {
  this.header(`## Button`); // Markdown.

  before(() => {

    function handleClick(e) {
      this.props({
        isWorking: true
      });
    }
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Button
            onClick={handleClick.bind(this)}
        />
    );
  });

  it("Set Working Indicator", () => this.props({isWorking: true}));
  it("Clear Working Indicator", () => this.props({isWorking: false}));
  it("Disable Button", () => this.props({isDisabled: true}));
  it("Enable Button", () => this.props({isDisabled: false}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Button

  An Button Element

  #### API

  - **text** *React.PropTypes.string* (optional) text value
  - **isWorking** *React.PropTypes.bool* (optional) disable button and show it's working
  - **isDisabled** *React.PropTypes.bool* disable button, by default set to true

  `);
});
