import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import color from 'color';
import {
  Colors,
  BackgroundColors,
  FormColors,
} from '../src/shared/colors';
import SelectInput from '../src/components/SelectInput';

describe('SelectInput', () => {
  it('Does render a SelectInput with default text', () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput />
    );
    expect(selectInputComponent).toBeDefined();
  });

  it('Does render a SelectInput with no selection state ', () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput />
    );
    expect(selectInputComponent.SelectInputRef.style.border)
      .toBe(`1px solid ${FormColors.border.toLowerCase()}`);
    const displayNode = ReactDOM.findDOMNode(selectInputComponent.displayRef);
    expect(displayNode.textContent).toBe('--');
    expect(color(displayNode.style.background).hexString()).toBe(BackgroundColors.primary);
  });

  it('Does contain a list of items to select', () => {
    const items = [
      {
        value: 'value',
        label: 'label',
      },
    ];
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput items={items} />
    );
    expect(selectInputComponent.itemsRef.listItemRefs.count()).toBe(1);
  });

  it('Does render a closed popover', () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput open={false} />
    );
    const selectInputPopoverNode = ReactDOM.findDOMNode(selectInputComponent.popoverRef.contentRef);
    expect(selectInputPopoverNode.style.visibility).toBe('hidden');
  });

  it('Does allow an initial value to be set', () => {
    const items = [
      {
        value: 'value',
        label: 'label',
      },
    ];
    const initialValue = 'value';
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        initialValue={initialValue}
        items={items}
      />
    );
    const displayNode = ReactDOM.findDOMNode(selectInputComponent.displayRef);
    expect(displayNode.textContent).toBe(items[0].label);
  });

  it('Does set value when an item is clicked', () => {
    const items = [
      {
        value: 'value',
        label: 'label',
      },
    ];
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        items={items}
      />
    );
    const selectInputNode = ReactDOM.findDOMNode(selectInputComponent.displayRef);
    TestUtils.Simulate.click(selectInputNode);
    const itemNode = ReactDOM.findDOMNode(
      selectInputComponent.itemsRef.listItemRefs.get(0).listItemRef
    );
    TestUtils.Simulate.click(itemNode);
    const displayNode = ReactDOM.findDOMNode(selectInputComponent.displayRef);
    expect(displayNode.textContent).toBe(items[0].label);
  });

  it('Does highlight selected value in dropdown', () => {
    const items = [
      {
        value: 'value',
        label: 'label',
      },
    ];
    const initialValue = 'value';
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        initialValue={initialValue}
        items={items}
      />
    );
    expect(
      selectInputComponent.itemsRef.listItemRefs.get(0).listItemRef.props.selected
    ).toBe(true);
  });

  it('does trigger onChange event when a value is selected', () => {
    const mockHandleChange = jest.fn();
    const items = [
      {
        value: 'value',
        label: 'label',
      },
    ];
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        items={items}
        onChange={mockHandleChange}
      />
    );
    const selectInputNode = ReactDOM.findDOMNode(selectInputComponent.displayRef);
    TestUtils.Simulate.click(selectInputNode);
    const itemNode = ReactDOM.findDOMNode(
      selectInputComponent.itemsRef.listItemRefs.get(0).listItemRef
    );
    TestUtils.Simulate.click(itemNode);
    expect(mockHandleChange).toBeCalledWith(items[0].value);
  });

  it('does render a disabled text input', () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        enabled={false}
      />
    );
    expect(selectInputComponent.displayRef.props.enabled).toBe(false);
  });

  it('does not open dropdown when disabled', () => {
    const items = [
      {
        value: 'value',
        label: 'label',
      },
    ];
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        enabled={false}
        items={items}
      />
    );
    const selectInputNode = ReactDOM.findDOMNode(selectInputComponent.displayRef);
    TestUtils.Simulate.click(selectInputNode);
    const selectInputPopoverNode = ReactDOM.findDOMNode(selectInputComponent.popoverRef.contentRef);
    expect(selectInputPopoverNode.style.visibility).toBe('hidden');
  });

  it('Does render with red shadow on error status', () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        status={'error'}
      />
    );
    const selectInputNode = ReactDOM.findDOMNode(selectInputComponent.SelectInputRef);
    expect(selectInputNode.style.boxShadow).toBe(`0 0 3px 1px ${Colors.danger}`);
  });

  it('Does render with an orange shadow on warning status', () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        status={'warning'}
      />
    );
    const selectInputNode = ReactDOM.findDOMNode(selectInputComponent.SelectInputRef);
    expect(selectInputNode.style.boxShadow).toBe(`0 0 3px 1px ${Colors.warning}`);
  });

  it('Does render with a green shadow on success status', () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        status={'success'}
      />
    );
    const selectInputNode = ReactDOM.findDOMNode(selectInputComponent.SelectInputRef);
    expect(selectInputNode.style.boxShadow).toBe(`0 0 3px 1px ${Colors.success}`);
  });

  it('Does return a valid state when a value has been selected', () => {
    const items = [
      {
        value: 'value',
        label: 'label',
      },
    ];
    const initialValue = 'value';
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        items={items}
        initialValue={initialValue}
      />
    );
    expect(selectInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: '',
    });
  });

  it('Does return valid state and not initial state when input changes', () => {
    const items = [
      {
        value: 'value',
        label: 'label',
      },
      {
        value: 'value2',
        label: 'label2',
      },
    ];
    const initialValue = 'value2';
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput
        items={items}
        initialValue={initialValue}
      />
    );
    const selectInputNode = ReactDOM.findDOMNode(selectInputComponent.displayRef);
    TestUtils.Simulate.click(selectInputNode);
    const itemNode = ReactDOM.findDOMNode(
      selectInputComponent.itemsRef.listItemRefs.get(0).listItemRef
    );
    TestUtils.Simulate.click(itemNode);
    expect(selectInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
  });

  it('does return invalid state', () => {
    const selectInputComponent = TestUtils.renderIntoDocument(
      <SelectInput />
    );
    expect(selectInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: 'A value must be selected',
    });
  });
});
