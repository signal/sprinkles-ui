/* eslint func-names: "off" */
/* eslint no-console: "off" */


import React from 'react';
import Field from '../../src/components/Field';
import TextInput from '../../src/components/TextInput';

describe('Field', function () {
  this.header(`
  ## Field
  `); // Markdown.

  before(() => {
    const handleChange = (newValue) => {
      console.log('newValue', newValue);
    };

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <Field
        label={'Field Label'}
        onChange={handleChange}
      >
        <TextInput
          initialValue={'Initial Value'}
          placeholder={'placeholder'}
        />
      </Field>
    ).width('100%');
  });

  it('Validate (output on console)', () =>
    console.log('Is Valid: ', UIHarness.component.validate()));
  it('Clear Label', () => this.props({ label: undefined }));
  it('Update Label', () => this.props({ label: 'Field Label' }));
  it('Set Error Status', () => this.props({ status: 'error' }));
  it('Set Warning Status', () => this.props({ status: 'warning' }));
  it('Set Success Status', () => this.props({ status: 'success' }));
  it('Clear Status', () => this.props({ status: undefined }));
  it('Set Error Message', () => this.props({ error: 'Field Error Message' }));
  it('Clear Error Message', () => this.props({ error: undefined }));
  it('Set Required', () => this.props({ required: true, requriedAsteriskDisplay: true }));
  it('Set Required, Asterisk Display Hidden', () => this.props({ required: true, requriedAsteriskDisplay: false }));
  it('Remove Required', () => this.props({ required: false }));
  it('Disables Field', () => this.props({ enabled: false }));
  it('Enables Field', () => this.props({ enabled: true }));
  it('Label Display Left', () => this.props({ labelPosition: 'left' }));
  it('Label Display Top', () => this.props({ labelPosition: 'top' }));
  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Field

  A Field Element

  #### API

  - **children** *React.PropTypes.node* current supported nodes: TextInput *(TODO: add more Documentation on how props passed down to children)*
  - **enabled** *React.PropTypes.bool* (optional) enable/disable user input
  - **error** *React.PropTypes.string* (optional) an error message that is displayed with the Field
  - **label** *React.PropTypes.string* (optional) a label to distingush the field
  - **onChange** *React.PropTypes.func* (optional) called when the input changes
  - **required** *React.PropTypes.bool* (optional) field is required (or not) to be in a valid state before it can be submitted
  - **status** *React.PropTypes.oneOf* (optional) set status of the Field. Acceptable value are 'error', 'warning' and 'success'

  `);
});
