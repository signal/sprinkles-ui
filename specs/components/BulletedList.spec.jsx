/* eslint func-names: "off" */

import React from 'react';
import BulletedList from '../../src/components/BulletedList';

describe('Bulleted List', function () {
  this.header(`
  ## Bulleted List
  `);

  before(() => {
    const listItems = [
      { text: 'Arrieta',
        styles: {
          color: 'blue',
        },
      },
      { text: 'Bryant',
        styles: {
          color: 'green',
          fontWeight: 'bold',
        },
      },
      { text: 'Báez' },
      { text: 'Chapman',
        styles: {
          color: 'red',
          fontWeight: 'bold',
          textDecoration: 'underline',
        },
      },
      { text: 'Rizzo' },
      { children: <a href={'http://chicago.cubs.mlb.com/'}>Chicago Cubs</a> },
    ];

    this.component(
      <BulletedList
        listItems={listItems}
      />
    );
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Bulleted List

  A semantic list of text items separated by bullets. If you want a structural list without bullets and default styling, look at the list component.

  #### API

  - **bulletStyle** *React.PropTypes.oneOf* (optional) All the possible styles as supported by the 'list-style' CSS property
    * 'disc',
    * 'circle',
    * 'square',
    * 'decimal',
    * 'decimal-leading-zero',
    * 'lower-roman',
    * 'upper-roman',
    * 'lower-greek',
    * 'lower-latin',
    * 'upper-latin',
    * 'armenian',
    * 'georgian',
    * 'lower-alpha',
    * 'upper-alpha',
    * 'none',
  - **listItems** *React.PropTypes.shape* (optional)
    - **children** *React.PropTypes.node* (optional) Suppy an HTML or React node (ex. an anchor tag)
    - **text** *React.PropTypes.sting* (optional)
    - **styles** *React.PropTypes.shape* (optional) styles text, overrides defaults
      - **color** *React.PropTypes.string* (optional) text color
      - **fontSize** *React.PropTypes.number* (optional) text size
      - **fontWeight** *React.PropTypes.string* (optional) text weight
      - **textDecoration** *React.PropTypes.oneOf(['underline', 'overline', 'line-through', 'none'])* (optional) add text decoration
  `);
});
