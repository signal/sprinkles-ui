/* eslint func-names: "off" */

import React from "react";
import NavBar from "../../src/components/NavBar";
import Text from "../../src/components/Text";
import { TextColors } from "../../src/shared/colors";

describe("NavBar", function () {
  this.header(`
  ## NavBar
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <NavBar
        title={"Title"}
      >
        <Text
          color={TextColors.light}
        >
          John
        </Text>
      </NavBar>
    ).width("100%");
  });

  it("Fixed position", () => this.props({ position: "fixed" }));
  it("Relative position", () => this.props({ position: undefined }));
  it("Title: My App", () => this.props({ title: "My App" }));
  it("Title: Title", () => this.props({ title: "Title" }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### NavBar

  Top Navigation Bar

  #### API

  - coming soon

  `);
});
