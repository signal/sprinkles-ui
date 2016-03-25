import React from "react";
import Button from "../../src/components/Button";

describe("Button", function() {
  this.header(`## Button`); // Markdown.

  before(() => {

    function handleClick(e) {
      this.props({
        working: true
      });
    }
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Button
            enabled={true}
            onClick={handleClick.bind(this)}
        />
    );
  });

  it("Set Working Indicator", () => this.props({working: true}));
  it("Clear Working Indicator", () => this.props({working: false}));
  it("Enable Button", () => this.props({enabled: true}));
  it("Disable Button", () => this.props({enabled: false}));
  it("Danger Button", () => this.props({type: "danger"}));
  it("Warning Button", () => this.props({type: "warning"}));
  it("Success Button", () => this.props({type: "success"}));
  it("Info Button", () => this.props({type: "info"}));
  it("Primary Button", () => this.props({type: "primary"}));
  it("Default Button", () => this.props({type: "default"}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Button

  An Button Element

  #### API

  - **text** *React.PropTypes.string* (optional) text value
  - **working** *React.PropTypes.bool* (optional) disable button and show it's working
  - **enabled** *React.PropTypes.bool* (optional) enable or disable the button, default is true

  `);
});
