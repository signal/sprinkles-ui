/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import Menu from '../../src/components/Menu';
import ListItem from '../../src/components/ListItem';
import TextListItem from '../../src/components/TextListItem';

describe('Menu', function () {
  this.header(`
  ## Menu
  `); // Markdown.

  before(() => {
    this.component(
      <Menu
        triggerEl={<div>Click Me</div>}
      >
        <div>
          <div>
            <ListItem>
              <TextListItem
                text={'Back'}
              />
            </ListItem>
            <ListItem>
              <TextListItem
                text={'Forward'}
              />
            </ListItem>
            <ListItem>
              <TextListItem
                text={'Reload'}
              />
            </ListItem>
          </div>
          <div>
            <ListItem>
              <TextListItem
                text={'Save As...'}
              />
            </ListItem>
          </div>
        </div>
      </Menu>
    ).width('100%');
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Field

  A Menu Element, wraps the Dropdown component and provides a little extra styling
  to give the appearance of a menu but no additional functionality.

  #### API

  - **children** *React.PropTypes.node* (optional) pass in your links to fill up your menu
  - **triggerEl** *React.PropTypes.node* use to trigger the menu to open and close

  `);
});
