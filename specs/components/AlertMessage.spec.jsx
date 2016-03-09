import React from "react";
import AlertMessage from "../../src/components/AlertMessage";

describe("AlertMessage", function() {
  this.header(`## Alert Message`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <AlertMessage />
    );
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A component for rendering text nodes

  #### API

  - **children** *React.PropTypes.node* (optional) child components or text nodes
  - **color** *React.PropTypes.string* (optional) text color
  - **fontSize** *React.PropTypes.string* (optional) text size

  `);
});
