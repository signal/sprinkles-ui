import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import PasswordInput from '../src/components/PasswordInput';

describe('PasswordInput', () => {
  it('Does render a PasswordInput', () => {
    const passwordInputComponent = ReactTestUtils.renderIntoDocument(
      <PasswordInput />,
    );
    const passwordInputNode = ReactDOM.findDOMNode(passwordInputComponent);
    expect(passwordInputComponent.inputRef.value)
      .toBe('');
    expect(passwordInputNode.getAttribute('type')).toBe('password');
  });

  it('Does render a disabled password input', () => {
    const passwordInputComponent = ReactTestUtils.renderIntoDocument(
      <PasswordInput enabled={false} />,
    );
    const passwordInputNode = ReactDOM.findDOMNode(passwordInputComponent);
    expect(passwordInputNode.disabled).toBe(true);
  });
});
