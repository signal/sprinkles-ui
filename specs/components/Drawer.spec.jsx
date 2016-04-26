/* eslint func-names: "off" */

import React from "react";
import Drawer from "../../src/components/Drawer";
import Text from "../../src/components/Text";
import { TextColors } from "../../src/shared/colors";


describe("Drawer", function () {
  this.header(`
  ## Drawer
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <Drawer open={true}>
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <Text
              color={TextColors.primary}
              fontSize={2}
            >
              {"Sup, I'm a drawer"}
            </Text>
          </div>
          <div>
            <Text
              color={TextColors.primary}
              fontSize={1}
            >
              {"And there's so much room for things!"}
            </Text>
          </div>
        </div>
      </Drawer>
    );
  });

  it("Closes Drawer", () => this.props({ open: false }));
  it("Opens Drawer", () => this.props({ open: true }));
  it("Warning: Opens From Left", () => this.props({ openFrom: "left" }));
  it("Opens From Right", () => this.props({ openFrom: "right" }));
  it("Sets Width 800px", () => this.props({ width: 800 }));
  it("Sets Default Width", () => this.props({ width: undefined }));
  it("Sets Random Background Color", () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    this.props({ backgroundColor: `#${color}` });
  });
  it("Sets Default Background Color", () => this.props({ backgroundColor: undefined }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Drawer

  A Drawer Element

  #### API

  - coming soon

  `);
});
