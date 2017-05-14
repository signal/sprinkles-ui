/* eslint func-names: "off" */

import React from 'react';
import SecondaryNav from '../../src/components/SecondaryNav';

describe('SecondaryNav', function () {
  this.header(`
  ## SecondaryNav
  `); // Markdown.

  before(() => {
    const itemStyle = {
      flex: 1,
      maxWidth: 55,
      textAlign: 'center',
    };
    const leftItems = ['Bread', '>', 'Crumbs'];
    const rightItems = ['User ▾'];
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <SecondaryNav
        leftItems={
          leftItems.map((item, i) =>
            <div
              key={i}
              style={itemStyle}
            >
              {item}
            </div>,
          )
        }
        rightItems={
          rightItems.map((item, i) =>
            <div
              key={i}
              style={itemStyle}
            >
              {item}
            </div>,
          )
        }
      />,
    ).width('100%').height(60);
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### SecondaryNav

  Top Navigation Bar, loose organization for navigation/header items.

  #### API

  - **leftItems** *PropTypes.node* (optional) Components you want visible on the left
  - **rightItems** *PropTypes.node* (optional) Components you want visible on the right

  `);
});
