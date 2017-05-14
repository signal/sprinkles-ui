import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import color from 'color';
import {
  BackgroundColors,
  NoticeColors,
  FormColors,
} from '../src/shared/colors';
import ToggleInput from '../src/components/ToggleInput';


describe('ToggleInput', () => {
  it('does render a ToggleInput', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput />,
    );
    expect(toggleInputComponent).toBeDefined();
  });

  it('does render a ToggleInput with expected style', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(toggleInputNode.style.border)
      .toBe(`1px solid ${FormColors.border.toLowerCase()}`);
    expect(toggleInputNode.style.width)
      .toBe('42px');
    expect(toggleInputNode.style.height)
      .toBe('26px');
    expect(toggleInputNode.style.borderRadius)
      .toBe('13px');
    expect(toggleInputNode.style.position)
      .toBe('relative');
    expect(toggleInputNode.style.cursor)
      .toBe('pointer');
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(BackgroundColors.primary);
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(switchNode.style.position)
      .toBe('absolute');
    expect(switchNode.style.top)
      .toBe('1px');
    expect(switchNode.style.left)
      .toBe('0px');
    expect(switchNode.style.width)
      .toBe('24px');
    expect(switchNode.style.height)
      .toBe('24px');
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(BackgroundColors.primary);
    expect(toggleInputNode.style.borderRadius)
      .toBe('13px');
    expect(toggleInputNode.style.border)
      .toBe(`1px solid ${FormColors.border.toLowerCase()}`);
  });

  it('does render ToggleInput with initialValue=true', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput initialValue={true} />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(NoticeColors.success);
    expect(toggleInputNode.style.border)
      .toBe(`1px solid ${NoticeColors.success.toLowerCase()}`);
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(switchNode.style.left)
      .toBe('18px');
  });

  it('does toggle the value with the ToggleInput is clicked', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    ReactTestUtils.Simulate.click(toggleInputNode);
    expect(toggleInputComponent.state.value).toBe(true);
  });

  it('does render a disabled ToggleInput', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput enabled={false} />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(BackgroundColors.secondary);
    expect(toggleInputNode.style.cursor)
      .toBe('not-allowed');
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(color(switchNode.style.background).hexString())
      .toBe(BackgroundColors.secondary);
    ReactTestUtils.Simulate.click(toggleInputNode);
    expect(toggleInputComponent.state.value).toBe(false);
  });

  it('does disable a ToggleInput who\'s value=true', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput
        enabled={false}
        initialValue={true}
      />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(color(toggleInputNode.style.background).hexString())
      .toBe(color(NoticeColors.success).lighten(0.4).hexString());
    expect(toggleInputNode.style.border)
      .toBe(`1px solid ${color(NoticeColors.success)
        .lighten(0.4)
        .hexString()
        .toLowerCase()}`);
    const switchNode = ReactDOM.findDOMNode(toggleInputComponent.switchRef);
    expect(color(switchNode.style.background).hexString())
      .toBe(BackgroundColors.secondary);
  });

  it('does trigger an onChange event when the value changes', () => {
    const mockHandleChange = jest.fn();
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput
        onChange={mockHandleChange}
      />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    ReactTestUtils.Simulate.click(toggleInputNode);
    expect(mockHandleChange).toBeCalledWith(true);
  });

  it('Does render with red shadow on error status', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput
        status={'error'}
      />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(toggleInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.danger}`);
  });

  it('Does render with an orange shadow on warning status', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput
        status={'warning'}
      />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(toggleInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.warning}`);
  });

  it('Does render with a green shadow on success status', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput
        status={'success'}
      />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    expect(toggleInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.success}`);
  });

  it('Does return a valid state when validated', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput />,
    );
    expect(toggleInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: '',
    });
  });

  it('Does return isInitialValue=false when value changes', () => {
    const toggleInputComponent = ReactTestUtils.renderIntoDocument(
      <ToggleInput />,
    );
    const toggleInputNode = ReactDOM.findDOMNode(toggleInputComponent);
    ReactTestUtils.Simulate.click(toggleInputNode);
    expect(toggleInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
  });
});
