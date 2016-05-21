/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import ToggleInput from '../../src/components/ToggleInput';


describe('ToggleInput', function () {
  this.header(`
  ## ToggleInput
  `); // Markdown.

  before(() => {
    const handleChange = (value) => console.log('Value: ', value);
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <ToggleInput
          onChange={handleChange}
        />
    );
  });

  it('disable', () => this.props({ enabled: false }));
  it('enable', () => this.props({ enabled: true }));
  it('Set Success Status', () => this.props({ status: 'success' }));
  it('Set Warning Status', () => this.props({ status: 'warning' }));
  it('Set Error Status', () => this.props({ status: 'error' }));
  it('Clear Status', () => this.props({ status: undefined }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### ToggleInput

  A component that toggles a boolean value

  #### API

  - comming soon


  `);
});
