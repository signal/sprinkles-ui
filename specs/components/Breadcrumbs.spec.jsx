/* eslint func-names: "off" */
/* eslint no-console: "off" */
/* eslint max-len: "off" */

import React from "react";
import Breadcrumbs from "../../src/components/Breadcrumbs";

describe("Breadcrumbs", function () {
  this.header(`
  ## Breadcrumbs
  `); // Markdown.

  before(() => {
    const handleClick = (itemData) => {
      console.log(`Item Clicked: ${JSON.stringify(itemData, null, 2)}`);
    };
    const path = [
      {
        display: "Level 1",
        url: "/lvl-1",
      },
      {
        display: "Level 2",
        url: "/lvl-1/lvl-2",
      },
      {
        display: "Level 3",
        url: "/lvl-1/lvl-2/lvl-3",
      },
    ];
    this.load(
      <Breadcrumbs
        onClick={handleClick}
        path={path}
      />
    ).width("100%");
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Breadcrumbs

  Render clickable Breadcrumbs

  #### API

  - coming soon

  `);
});
