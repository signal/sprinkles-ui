/* eslint func-names: "off" */

import React from "react";
import loremIpsum from "lorem-ipsum";
import NavListItem from "../../src/components/NavListItem";


describe("NavListItem", function () {
  this.header(`
  ## NavListItem
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <NavListItem
          icon={
            <circle
              cx="5"
              cy="5"
              fill="red"
              r="5"
            ></circle>
          }
          text={loremIpsum()}
        />
    );
  });

  it("Selected", () => this.props({ selected: true }));
  it("Not Selected", () => this.props({ selected: false }));
  it("Hovered", () => this.props({ hovered: true }));
  it("Not Hovered", () => this.props({ hovered: false }));
  it("Expanded", () => this.props({ expanded: true }));
  it("Not Expanded", () => this.props({ expanded: false }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### NavListItem

  A component for rendering text list items

  #### API

  - coming soon

  `);
});
