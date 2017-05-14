/* eslint func-names: "off" */

import React from 'react';
import loremIpsum from 'lorem-ipsum';
import TextListItem from '../../src/components/TextListItem';


describe('TextListItem', function () {
  this.header(`
  ## TextListItem
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <TextListItem
        text={loremIpsum()}
      />,
    );
  });

  it('Selected', () => this.props({ selected: true }));
  it('Not Selected', () => this.props({ selected: false }));
  it('Hovered', () => this.props({ hovered: true }));
  it('Not Hovered', () => this.props({ hovered: false }));
  it('List Position: First', () => this.props({ listPosition: 'first' }));
  it('List Position: Middle', () => this.props({ listPosition: 'middle' }));
  it('List Position: Last', () => this.props({ listPosition: 'last' }));
  it('List Position: Undefined', () => this.props({ listPosition: undefined }));
  it('Disabled', () => this.props({ enabled: false }));
  it('Enabled', () => this.props({ enabled: true }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### TextListItem

  A component for rendering text list items

  #### API

  - **enabled** *PropTypes.bool* (optional) sets ability for a user to interact, by default this is true
  - **hovered** *PropTypes.bool* (optional) used with a parent component to set hover styles
  - **listPosition** *PropTypes.oneOf* (optional) used for styling, options: 'first', 'middle', 'last'
  - **onClick** *PropTypes.function* (optional) called whenever a user clicks an item
  - **selected** *PropTypes.bool* (optional) used by a parent component for styling, informs a user which is active
  - **text** *PropTypes.string* (optional) description of the item

  `);
});
