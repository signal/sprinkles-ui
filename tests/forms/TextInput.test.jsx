import React from 'react';
import ReactDOM from 'react-dom';
import color from 'color';
import TestUtils from 'react-addons-test-utils';
import TextInput from '../../src/components/forms/TextInput';
import { FormColors } from '../../src/shared/colors';


describe('TextInput', () => {
  it('Does render a TextInput', () => {
    const TextInputComponent = TestUtils.renderIntoDocument(
      <TextInput fieldId="foo" />
    );
    expect(TextInputComponent).toBeDefined();
  });

  it('Does render a disabled text input', () => {
    const TextInputComponent = TestUtils.renderIntoDocument(
      <TextInput fieldId="foo" enabled={false} />
    );
    const TextInputComponentNode = ReactDOM.findDOMNode(TextInputComponent);
    expect(TextInputComponentNode.disabled).toBe(true);
  });

  it('Does render error styles with an error set', () => {
    const TextInputComponent = TestUtils.renderIntoDocument(
      <TextInput
        fieldId="foo"
        enabled={false}
        meta={{ error: { type: 'foo' }, touched: true }}
      />
    );
    const TextInputComponentNode = ReactDOM.findDOMNode(TextInputComponent);
    const borderColor = window.getComputedStyle(TextInputComponentNode).borderColor;
    expect(color(borderColor).hexString()).toBe(FormColors.requiredNotation);
  });
});
