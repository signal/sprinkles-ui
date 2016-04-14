/* eslint func-names: "off" */

import React from "react";
import ButtonGroup from "../../src/components/ButtonGroup";
import Button from "../../src/components/Button";

describe("ButtonGroup", function () {
  this.header(`
  ## ButtonGroup
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <ButtonGroup>
        <Button buttonKey={"1"} />
        <Button buttonKey={"2"} />
        <Button buttonKey={"3"} />
      </ButtonGroup>
    );
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Button

  An Button Element

  #### API

  - coming soon

  `);
});
