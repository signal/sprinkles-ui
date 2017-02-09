/* eslint func-names: "off" */

import React from 'react';
import InputItem from '../../src/components/forms/InputItem';
import TextInput from '../../src/components/forms/TextInput';

describe('InputItem', function () {
  this.header(`
  ## InputItem
  `); // Markdown.

  before(() => {
    this.component(
      <InputItem
        fieldName={'name'}
        errorMessage={'Name is Required'}
        label={'Name'}
        required={true}
      >
        <TextInput
          fieldId="name"
        />
      </InputItem>
    ).width('100%');
  });

  it('Disable', () => this.props({ enabled: false }));
  it('Enable', () => this.props({ enabled: true }));
  it('Show Error', () => this.props({ meta: { error: { type: 'foo' }, touched: true } }));
  it('Remove Error', () => this.props({ meta: { error: null } }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### InputItem

  * Fill me in
  `);
});
