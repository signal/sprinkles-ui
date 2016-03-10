import React from "react";
import AlertMessage from "../../src/components/AlertMessage";

describe("AlertMessage", function() {
  this.header(`## Alert Message`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <AlertMessage
            body="Test"
            type="info"
        />
    ).width("100%");
  });

  it("Show success message", () => this.props({body: "Yay! It worked", title: "", type: "success"}));
  it("Show success message with title", () => this.props({body: "Yay! It worked", title: "WOW", type: "success"}));
  it("Show info message", () => this.props({body: "This is some information you might like", title: "", type: "info"}));
  it("Show info message with title", () => this.props({body: "This is some information you might like", title: "Note", type: "info"}));
  it("Show warning message", () => this.props({body: "Be careful you might run into a problem", title: "", type: "warning"}));
  it("Show warning message with title", () => this.props({body: "Be careful you might run into a problem", title: "Caution:", type: "warning"}));
  it("Show danger message", () => this.props({body: "Yikes! You dun broke it", title: "", type: "danger"}));
  it("Show danger message with title", () => this.props({body: "Yikes! You dun broke it", title: "Warning!", type: "danger"}));
  it("Show danger messages with title", () => this.props({body: ["Error 1", "Error 2"], title: "Please reset your password using the following criteria:", type: "danger"}));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A component that provides contextural feedback messages for typical user actions.

  #### API
  - **body** *React.PropTypes.oneOfType* string description or array of descriptions
  - **title** *React.PropTypes.string* (optional) Bold qualifier of message
  - **type** *React.PropTypes.oneOf* Sets the color of the alert message, one option must be specified: 'success', 'info', 'warning', 'danger'

  `);
});
