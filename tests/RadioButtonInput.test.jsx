import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import RadioButtonInput from '../src/components/RadioButtonInput';


describe('RadioButtonInput', () => {
  const items = [
    {
      name: 'Name',
      value: 'Value',
    },
    {
      name: 'Name2',
      value: 'Value2',
    },
  ];

  it('Does render a RadioButtonInput', () => {
    // Render an RadioButtonInput
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput items={items} />,
    );
    expect(radioButtonInputComponent).toBeDefined();
  });

  it('Does render RadioButtonInput Items', () => {
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput items={items} />,
    );
    const radioInputs = ReactTestUtils
      .scryRenderedDOMComponentsWithTag(radioButtonInputComponent, 'input');
    expect(radioInputs.length).toBe(2);
    radioInputs.forEach((item, i) => {
      expect(item.name).toBe(items[i].name);
      expect(item.value).toBe(items[i].value);
    });
    const radioLabels = ReactTestUtils
      .scryRenderedDOMComponentsWithTag(radioButtonInputComponent, 'Text');
    radioLabels.forEach((item, i) => {
      expect(item.textContent).toBe(items[i].name);
    });
  });

  it('Does render a RadioButton input with the first item selected by default', () => {
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput items={items} />,
    );
    const radioInputs = ReactTestUtils
      .scryRenderedDOMComponentsWithTag(radioButtonInputComponent, 'input');
    radioInputs.forEach((item, i) => {
      if (i === 0) {
        expect(item.checked).toBe(true);
      } else {
        expect(item.checked).toBe(false);
      }
    });
  });

  it('Does change the value when the a Radio item is selected', () => {
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput items={items} />,
    );
    expect(radioButtonInputComponent.state.value).toBe('Value');
    const unSelectedRadioInputNode = ReactDOM
      .findDOMNode(radioButtonInputComponent.radioInputRefs[1]);
    ReactTestUtils.Simulate.click(unSelectedRadioInputNode);
    expect(radioButtonInputComponent.state.value).toBe('Value2');
  });

  it('Does fire an onChange event when the value changes', () => {
    const mockHandleChange = jest.genMockFunction();
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput
        items={items}
        onChange={mockHandleChange}
      />,
    );
    const unSelectedRadioInputNode = ReactDOM
      .findDOMNode(radioButtonInputComponent.radioInputRefs[1]);
    ReactTestUtils.Simulate.click(unSelectedRadioInputNode);
    expect(mockHandleChange).toBeCalledWith('Value2');
  });

  it('Does set the initialValue of the RadioButtonInput', () => {
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput
        initialValue={'Value2'}
        items={items}
      />,
    );
    expect(radioButtonInputComponent.state.value).toBe('Value2');
  });

  it('Does render a disabled RadioButtonInput', () => {
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput
        enabled={false}
        items={items}
      />,
    );
    const radioInputs = ReactTestUtils
      .scryRenderedDOMComponentsWithTag(radioButtonInputComponent, 'input');
    radioInputs.forEach((item) => {
      expect(item.disabled).toBe(true);
    });
  });

  it('Does validate the RadioButtonInput', () => {
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput items={items} />,
    );
    expect(radioButtonInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: '',
    });
  });

  it('Does validate the RadioButtonInput and detect changed input', () => {
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput items={items} />,
    );
    const unSelectedRadioInputNode = ReactDOM
      .findDOMNode(radioButtonInputComponent.radioInputRefs[1]);
    ReactTestUtils.Simulate.click(unSelectedRadioInputNode);
    expect(radioButtonInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
  });

  it('Does validate the RadioButtonInput and detect changed input with initialValue set', () => {
    const radioButtonInputComponent = ReactTestUtils.renderIntoDocument(
      <RadioButtonInput
        initialValue={'Value2'}
        items={items}
      />,
    );
    const unSelectedRadioInputNode = ReactDOM
      .findDOMNode(radioButtonInputComponent.radioInputRefs[0]);
    ReactTestUtils.Simulate.click(unSelectedRadioInputNode);
    expect(radioButtonInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
  });
});
