import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TextInput from '../../src/components/forms/TextInput';

describe('TextInput', () => {
  it('Does render a TextInput', () => {
    const TextItemComponent = TestUtils.renderIntoDocument(
      <TextInput meta={{ error: {} }}fieldId={'foo'} />
    );
    expect(TextItemComponent).toBeDefined();
  });
});
