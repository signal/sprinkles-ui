/* eslint func-names: "off" */

import React from 'react';
import loremIpsum from 'lorem-ipsum';
import DropdownButton from '../../src/components/DropdownButton';

describe('DropdownButton', function () {
  this.header(`
  ## DropdownButton
  `); // Markdown.

  before(() => {
    const handleClick = () => {
      this.props({
        working: true,
      });
    };
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <DropdownButton
        enabled={true}
        onClick={handleClick.bind(this)}
        text={'Foo'}
        type={'primary'}
      />
    );
  });

  it('Enlarge arrow', () => this.props({ caretSize: 7 }));
  it('Shrink arrow', () => this.props({ caretSize: 4 }));
  it('Set Working Indicator', () => this.props({ working: true }));
  it('Clear Working Indicator', () => this.props({ working: false }));
  it('Enable Button', () => this.props({ enabled: true }));
  it('Disable Button', () => this.props({ enabled: false }));
  it('Danger Button', () => this.props({ type: 'danger' }));
  it('Warning Button', () => this.props({ type: 'warning' }));
  it('Success Button', () => this.props({ type: 'success' }));
  it('Info Button', () => this.props({ type: 'info' }));
  it('Primary Button', () => this.props({ type: 'primary' }));
  it('Secondary (Default) Button', () => this.props({ type: 'secondary' }));
  it('Updates Button Text', () => this.props({ text: loremIpsum() }));
  it('Resets Button Text', () => this.props({ text: undefined }));
  it('Group Position: Left', () => this.props({ groupPosition: 'left' }));
  it('Group Position: Center', () => this.props({ groupPosition: 'center' }));
  it('Group Position: Right', () => this.props({ groupPosition: 'right' }));
  it('Sets Styles', () => this.props({ style: { background: 'pink' } }));
  it('Resets Styles', () => this.props({ style: {} }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### DropdownButton

  Extends Button to provide a clickable element suitable for a dropdown.

  #### API

  - **arrowSize** *React.PropTypes.number* (optional) sets the arrow size
  - _See **Button** for all other API settings_

  `);
});
