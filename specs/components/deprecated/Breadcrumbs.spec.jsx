/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import Breadcrumbs from '../../../src/components/deprecated/Breadcrumbs';

describe('Breadcrumbs', function () {
  this.header(`
  ## Breadcrumbs
  `); // Markdown.

  before(() => {
    const handleClick = (itemData) => {
      console.log(`Item Clicked: ${JSON.stringify(itemData, null, 2)}`);
    };
    const path = [
      {
        display: 'Level 1',
        url: '/lvl-1',
      },
      {
        display: 'Level 2',
        url: '/lvl-1/lvl-2',
      },
      {
        display: 'Level 3',
        url: '/lvl-1/lvl-2/lvl-3',
      },
    ];
    this.component(
      <Breadcrumbs
        onClick={handleClick}
        path={path}
      />,
    ).width('100%');
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Breadcrumbs

  Render clickable Breadcrumbs

  #### API

  - **path** *PropTypes.arrayOf(PropTypes.shape)* (optional)
    - **display** *PropTypes.string* (optional) Name for your link
    - **url** *PropTypes.string* (optional) Url to direct the link to
    - **onClick** *PropTypes.function* (optional) Event handler for when a link is clicked
  `);
});
