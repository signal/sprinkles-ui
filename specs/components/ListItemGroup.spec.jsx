/* eslint func-names: "off" */

import React from 'react';
import ListItemGroup from '../../src/components/ListItemGroup';

describe('ListItemGroup', function () {
  this.header(`
  ## ListItemGroup
  `);

  before(() => {
    this.load(
      <ListItemGroup label={"Group"} />
    );
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### ListItemGroup

  A group of list items

  #### API

  - coming soon

  `);
});
