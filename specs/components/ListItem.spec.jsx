/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import loremIpsum from 'lorem-ipsum';
import ListItem from '../../src/components/ListItem';
import TextListItem from '../../src/components/TextListItem';


describe('ListItem', function () {
  this.header(`
  ## ListItem
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <ListItem onClick={() => console.log('ListItem clicked')}>
        <TextListItem
          text={loremIpsum()}
        />
      </ListItem>,
    );
  });

  it('Select ListItem', () => this.props({ selected: true }));
  it('Unselect ListItem', () => this.props({ selected: false }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### ListItem

  A component for rendering an individual list item.

  #### API

  - **children** *PropTypes.node* (optional) child components
  // TODO: document what props are passed to children (or look at TextListItem as an example)
  - **onClick** *PropTypes.func* (optional) click hander function
  - **selected** *PropTypes.bool* (optional) selection state

  `);
});
