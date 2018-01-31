/* eslint func-names: "off" */

import React from 'react';
import loremIpsum from 'lorem-ipsum';
import NavListItem from '../../../src/components/deprecated/NavListItem';


describe('NavListItem', function () {
  this.header(`
  ## NavListItem
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <NavListItem
        icon={
          <circle
            cx={'6'}
            cy={'6'}
            fill={'red'}
            r={'6'}
          />
        }
        text={loremIpsum()}
      />,
    );
  });

  it('Selected', () => this.props({ selected: true }));
  it('Not Selected', () => this.props({ selected: false }));
  it('Hovered', () => this.props({ hovered: true }));
  it('Not Hovered', () => this.props({ hovered: false }));
  it('Expanded', () => this.props({ expanded: true }));
  it('Not Expanded', () => this.props({ expanded: false }));
  it('Make Icon Bigger', () => this.props({
    height: 30,
    width: 30,
  }));
  it('Make Icon Smaller', () => this.props({
    height: 20,
    width: 20,
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### NavListItem

  A component for rendering text list items

  #### API

  - **linkStyle** *PropTypes.shape* (optional)
    - **color** *PropTypes.string* (optional) specify a color for the links, defaults to '#CCCCCC'
    - **fontSize** *PropTypes.number* (optional) sets the font size for the links, defaults to 1
    - **fontWeight** *PropTypes.string* (optional) defaults to 'normal'
    - **textDecoration** *PropTypes.oneOf* (optional) stylize the text, options include 'underline', 'overline', 'line-through', 'none'
  - **expanded** *PropTypes.bool* (optional) sets if the text should be shown in addition to the icon. Defaults to true
  - **height** *PropTypes.number* (optional) defaults to 20
  - **hovered** *PropTypes.bool* (optional) for use with a parent component to trigger hover effects
  - **icon** *PropTypes.node* (optional) pass in a graphic for use next to the text
  - **selected** *PropTypes.bool* (optional) trigger selected styles for the link
  - **text** *PropTypes.string* (optional) text used for the link
  - **width** *PropTypes.number* (optional) defaults to 20
  - **type** *PropTypes.oneOf* (optional) Background color on hover, options available in the BackgroundColors class within shared/colors.js
  - **urlPath** *PropTypes.string* (optional) Triggers use of React Router, url to point to for the link
  `);
});
