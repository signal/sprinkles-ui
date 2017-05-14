import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import EmailInput from '../src/components/EmailInput';

describe('EmailInput', () => {
  it('Does render a EmailInput', () => {
    const email = 'test@signal.co';
    const emailInputComponent = ReactTestUtils.renderIntoDocument(
      <EmailInput initialValue={email} />,
    );
    expect(emailInputComponent.inputRef.value)
      .toBe(email);
  });

  it('Does validate valid email addresses', () => {
    const emailInputComponent = ReactTestUtils.renderIntoDocument(
      <EmailInput initialValue={'test@signal.co'} />,
    );
    const emailInputNode = ReactDOM.findDOMNode(emailInputComponent);
    expect(emailInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: '',
    });
    // test a different username
    let changedText = 'another@signal.co';
    ReactTestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
    // test a different domain
    changedText = 'test@test.com';
    ReactTestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
    // test an email alias
    changedText = 'test+spam@test.com';
    ReactTestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
  });

  it('Does validate invalid email address', () => {
    // test a simple string
    const emailInputComponent = ReactTestUtils.renderIntoDocument(
      <EmailInput initialValue={'test'} />,
    );
    const emailInputNode = ReactDOM.findDOMNode(emailInputComponent);
    expect(emailInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: 'Invalid email address',
    });
    // test an email missing domain
    let changedText = 'test@';
    ReactTestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: false,
      validationError: 'Invalid email address',
    });
    // test an email missing a user
    changedText = '@signal.co';
    ReactTestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: false,
      validationError: 'Invalid email address',
    });
    // test an email address missing .X
    changedText = 'test@signal';
    ReactTestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: false,
      validationError: 'Invalid email address',
    });
  });
});
