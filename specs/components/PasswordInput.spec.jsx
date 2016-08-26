/* eslint func-names: "off" */
/* eslint no-console: "off" */
/* eslint max-len: "off" */

import React from 'react';
import loremIpsum from 'lorem-ipsum';
import PasswordInput from '../../src/components/PasswordInput';


describe('PasswordInput', function () {
  this.header(`
  ## PasswordInput
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.

    const handleChange = (newValue) => {
      console.log('newValue', newValue);
    };

    this.load(
      <PasswordInput
        onChange={handleChange}
        placeholder={'password'}
      />
    ).width('100%');
  });

  // Since two-way binding is implemented changing the state of the wrapper
  // will also update the DOM.
  it('Update value', () => UIHarness.component.setState({ value: loremIpsum() }));
  it('Clear value', () => UIHarness.component.setState({ value: '' }));
  it('Validate (output on console)', () =>
    console.log('Is Valid: ', UIHarness.component.validate()));
  it('Update placeholder', () => this.props({ placeholder: loremIpsum() }));
  it('Clear placeholder', () => this.props({ placeholder: 'password' }));
  it('Set Success Status', () => this.props({ status: 'success' }));
  it('Set Warning Status', () => this.props({ status: 'warning' }));
  it('Set Error Status', () => this.props({ status: 'error' }));
  it('Clear Status', () => this.props({ status: undefined }));
  it('Disable Input', () => this.props({ enabled: false }));
  it('Enable Input', () => this.props({ enabled: true }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A PasswordInput Element

  #### API

  - **autoComplete** *React.PropTypes.bool* (optional) toggle input autoComplete from browser
  - **enabled** *React.PropTypes.bool* (optional) enable/disable user input
  - **initialValue** *React.PropTypes.string* (optional) initial value of the input
  - **onChange** *React.PropTypes.func* (optional) callback called when the value of the text box changes
  - **placeholder** *React.PropTypes.string* (optional) placeholder when text is empty
  - **status** *React.PropTypes.oneOf* (optional) set status of the input (overrides focus). Acceptable values are 'error', 'warning' and 'success'

  `);
});
