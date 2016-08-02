import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// don't mock our CUT or components it depends on
jest.dontMock('../src/components/EmailInput');
jest.dontMock('../src/components/TextInput');

// TODO: move this to es6 style import when its implemented in jest
const EmailInput = require('../src/components/EmailInput').default;

describe('EmailInput', () => {
  it('Does render a EmailInput', () => {
    const email = 'test@signal.co';
    const emailInputComponent = TestUtils.renderIntoDocument(
      <EmailInput initialValue={email} />
    );
    expect(emailInputComponent.inputRef.value)
      .toBe(email);
  });

  it('Does validate valid email addresses', () => {
    const emailInputComponent = TestUtils.renderIntoDocument(
      <EmailInput initialValue={'test@signal.co'} />
    );
    const emailInputNode = ReactDOM.findDOMNode(emailInputComponent);
    expect(emailInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: '',
    });
    // test a different username
    let changedText = 'another@signal.co';
    TestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
    // test a different domain
    changedText = 'test@test.com';
    TestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
    // test an email alias
    changedText = 'test+spam@test.com';
    TestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
  });

  it('Does validate invalid email address', () => {
    // test a simple string
    const emailInputComponent = TestUtils.renderIntoDocument(
      <EmailInput initialValue={'test'} />
    );
    const emailInputNode = ReactDOM.findDOMNode(emailInputComponent);
    expect(emailInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: 'Invalid email address',
    });
    // test an email missing domain
    let changedText = 'test@';
    TestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: false,
      validationError: 'Invalid email address',
    });
    // test an email missing a user
    changedText = '@signal.co';
    TestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: false,
      validationError: 'Invalid email address',
    });
    // test an email address missing .X
    changedText = 'test@signal';
    TestUtils.Simulate.change(emailInputNode, { target: { value: changedText } });
    expect(emailInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: false,
      validationError: 'Invalid email address',
    });
  });
});
