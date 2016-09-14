/* eslint func-names: "off" */

import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Text from '../../src/components/Text';


describe('Text', function () {
  this.header(`
  ## Text
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <Text>{loremIpsum()}</Text>
    );
  });

  // Thanks Paul Irish: http://www.paulirish.com/2009/random-hex-color-code-snippets/
  it('Update Color', () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    this.props({
      color: `#${color}`,
    });
  });

  it('Increase Font Size', () => {
    const curFontSize = this.props() && this.props().fontSize ?
      this.props().fontSize : 1;

    this.props({
      fontSize: Math.min(curFontSize + 0.5, 3),
    });
  });

  it('Decrease Font Size', () => {
    const curFontSize = this.props() && this.props().fontSize ?
      this.props().fontSize : 1;

    this.props({
      fontSize: Math.max(curFontSize - 0.5, 0.5),
    });
  });

  it('Font Weight: Bold', () => this.props({ fontWeight: '700' }));
  it('Font Weight: Standard', () => this.props({ fontWeight: '400' }));
  it('Text Decoration: underline', () => this.props({ textDecoration: 'underline' }));
  it('Text Decoration: overline', () => this.props({ textDecoration: 'overline' }));
  it('Text Decoration: line-through', () => this.props({ textDecoration: 'line-through' }));
  it('Text Decoration: none', () => this.props({ textDecoration: undefined }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A component for rendering text nodes

  #### API

  - **children** *React.PropTypes.node* (optional) child components or text nodes
  - **color** *React.PropTypes.string* (optional) text color
  - **fontSize** *React.PropTypes.string* (optional) text size
  - **fontWeight** *React.PropTypes.string* (optional) text weight
  - **textDecoration** *React.PropTypes.oneOf(['underline', 'overline', 'line-through'])* (optional) add text decoration

  `);
});
