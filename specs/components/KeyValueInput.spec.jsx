/* eslint func-names: "off" */

import React from 'react';
import KeyValueInput from '../../src/components/KeyValueInput';


describe('KeyValueInput', function () {
  this.header(`
  ## KeyValueInput
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <KeyValueInput
        initialValue={[
          {
            key: 'some key',
            value: 'some value',
          },
          {
            key: 'some other key',
            value: 'some other value',
          },
        ]}
      />
    ).width(600);
  });

  it('Key Label: My Key Label', () => this.props({ keyLabel: 'My Key Label' }));
  it('Key Label: Key', () => this.props({ keyLabel: undefined }));
  it('Value Label: My Value Label', () => this.props({ valueLabel: 'My Value Label' }));
  it('Value Label: Value', () => this.props({ valueLabel: undefined }));
  it('Add Button: My Add Button', () => this.props({ addButtonText: 'My Add Button' }));
  it('Add Button: Add', () => this.props({ addButtonText: undefined }));
  it('Disable', () => this.props({ enabled: false }));
  it('Enable', () => this.props({ enabled: true }));
  it('Status: success', () => this.props({ status: 'success' }));
  it('Status: error', () => this.props({ status: 'error' }));
  it('Clear Status', () => this.props({ status: undefined }));
  it('Valid if all keys unique', () => this.props({ uniqueKeys: true }));
  it('Valid with any non-empty keys', () => this.props({ uniqueKeys: false }));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### KeyValueInput

  A component for building key value pairs

  #### API

  - **addButtonText** *React.PropTypes.string* (optional) Text used for button to add a pair, defaults to 'Add'
  - **enabled** *React.PropTypes.bool* (optional) Sets the ability to interact with the field, defaults to true
  - **initialValue** *React.PropTypes.arrayOf(React.PropTypes.shapeOf)* (optional)
    - **key** *React.PropTypes.string* (optional) key for the field, defautls to ''
    - **value** *React.PropTypes.string* (optional) value for the field, defaults to ''
  - **keyLabel** *React.PropTypes.string* (optional) label for the key field, defaults to 'Key'
  - **onChange** *React.PropTypes.function* (optional) called when any change occurs, addition, deletion, or field change
  - **uniqueKeys** *React.PropTypes.shape* (optional) validation that all fields must be unique, defaults to false
  - **valueLabel** *React.PropTypes.shape* (optional) label for the value field, defaults to 'Value'
  - **status** *React.PropTypes.shape* (optional) set an initial validation of the input, 'success' or 'error'
  `);
});
