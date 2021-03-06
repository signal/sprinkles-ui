import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { NoticeColors } from '../src/shared/colors';
import TextInput from '../src/components/TextInput';

describe('TextInput', () => {
  it('Does render an TextInput with default text', () => {
    const text = 'howdy';
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput
        initialValue={text}
      />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputComponent.inputRef.value)
      .toBe(text);
    expect(textInputNode.getAttribute('autocomplete'))
      .toBe('on');
  });

  it('Does render an editable input', () => {
    const changedText = 'howdy';
    const handleChange = jest.genMockFunction();
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput
        initialValue={''}
        onChange={handleChange}
      />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    ReactTestUtils.Simulate.change(textInputNode, { target: { value: changedText } });
    expect(handleChange).toBeCalledWith(changedText);
  });

  it('Does set isFocused when component is in focus', () => {
    // Render an editable TextInput
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput />,
    );
    textInputComponent.setState = jest.genMockFunction();
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputComponent.setState).not.toBeCalled();
    ReactTestUtils.Simulate.focus(textInputNode);
    expect(textInputComponent.setState).toBeCalledWith({ isFocused: true });
    ReactTestUtils.Simulate.blur(textInputNode);
    expect(textInputComponent.setState).toBeCalledWith({ isFocused: false });
  });

  it('Does render with a placeholder', () => {
    const placeholder = 'placeholder';
    // Render an editable TextInput
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput
        placeholder={placeholder}
      />,
    );
    // grab the DOM node so we can inspect it
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputNode.getAttribute('placeholder')).toBe(placeholder);
  });

  it('Does render with red shadow on error status', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput
        status={'error'}
      />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.danger}`);
  });

  it('Does render with an orange shadow on warning status', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput
        status={'warning'}
      />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.warning}`);
  });

  it('Does render with a green shadow on success status', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput
        status={'success'}
      />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.success}`);
  });

  it('Does return invalid state with empty TextInput', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput />,
    );
    expect(textInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: 'Field Must Not Be Empty',
    });
  });

  it('Does return valid state when TextInput has a value', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput initialValue={'a'} />,
    );
    expect(textInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: '',
    });
  });

  it('Does return valid state and not initial state when input changes', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: 'Field Must Not Be Empty',
    });
    ReactTestUtils.Simulate.change(textInputNode, { target: { value: 'a' } });
    expect(textInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
  });

  it('Does return invalid state and not initial state when input changes', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput initialValue={'a'} />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: '',
    });
    ReactTestUtils.Simulate.change(textInputNode, { target: { value: '' } });
    expect(textInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: false,
      validationError: 'Field Must Not Be Empty',
    });
  });

  it('Does disable autocomplete on inputbox', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput autoComplete={false} />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputNode.getAttribute('autocomplete')).toBe('off');
  });

  it('Does render a disabled text input', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput enabled={false} />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputNode.disabled).toBe(true);
  });

  it('Does render a TextInput with a bound value', () => {
    const boundValue = 'howdy';
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput boundValue={boundValue} />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputComponent.inputRef.value)
      .toBe(boundValue);
    ReactTestUtils.Simulate.change(textInputNode, { target: { value: '' } });
    expect(textInputComponent.inputRef.value)
      .toBe(boundValue);
  });

  it('Does trigger onChange event on boundInput', () => {
    const boundValue = 'howdy';
    const changedText = 'hi';
    const mockHandleChange = jest.genMockFunction();
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput
        boundValue={boundValue}
        onChange={mockHandleChange}
      />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    ReactTestUtils.Simulate.change(textInputNode, { target: { value: changedText } });
    expect(mockHandleChange).toBeCalledWith(changedText);
  });

  it('Does return the expected initial value', () => {
    const value = 'value';
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput
        initialValue={value}
      />,
    );
    expect(textInputComponent.value()).toBe(value);
  });

  it('Does render a multiline TextInput', () => {
    const textInputComponent = ReactTestUtils.renderIntoDocument(
      <TextInput multiline={true} />,
    );
    const textInputNode = ReactDOM.findDOMNode(textInputComponent);
    expect(textInputNode.nodeName).toBe('TEXTAREA');
  });
});
