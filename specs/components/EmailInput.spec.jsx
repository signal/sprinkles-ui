import React from "react";
import loremIpsum from "lorem-ipsum";
import EmailInput from "../../src/components/EmailInput";


describe("EmailInput", function() {
  this.header(`## EmailInput`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.

    function handleChange(newValue) {
      console.log("newValue", newValue);
    };

    this.load(
        <EmailInput
            onChange={handleChange}
            placeholder={"email"}
        />
    ).width("100%");
  });

  // Since two-way binding is implemented changing the state of the wrapper
  // will also update the DOM.
  it("Update value", () => UIHarness.component.setState({value: "test@signal.co"}));
  it("Clear value", () => UIHarness.component.setState({value: ""}));
  it("Validate (output on console)", () => console.log("Is Valid: ", UIHarness.component.validate()));
  it("Update placeholder", () => this.props({placeholder: loremIpsum()}));
  it("Clear placeholder", () => this.props({placeholder: "email"}));
  it("Set Success Status", () => this.props({status: "success"}));
  it("Set Warning Status", () => this.props({status: "warning"}));
  it("Set Error Status", () => this.props({status: "error"}));
  it("Clear Status", () => this.props({status: undefined}));
  it("Disable Autocomplete", () => this.props({autoComplete: false}));
  it("Enable Autocomplete", () => this.props({autoComplete: true}));
  it("Disable Input", () => this.props({enabled: false}));
  it("Enable Input", () => this.props({enabled: true}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A EmailInput Element

  #### API

  - **onChange** *React.PropTypes.func* (optional) callback called when the value of the text box changes
  - **placeholder** *React.PropTypes.string* (optional) placeholder when text is empty
  - **status** *React.PropTypes.oneOf* (optional) set status of text box (overrides focus). Acceptable values are 'error', 'warning' and 'success'

  `);
});
