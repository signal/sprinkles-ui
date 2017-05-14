import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import color from 'color';
import { NoticeColors, TextColors } from '../src/shared/colors';
import KeyValueInput from '../src/components/KeyValueInput';


describe('KeyValueInput', () => {
  it('Does render a KeyValueInput', () => {
    // Render a KeyValueInput with no style
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput />,
    );
    expect(keyValueInputComponent).toBeDefined();
  });

  it('Does render an empty KeyValueInput', () => {
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput />,
    );
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: '',
      value: '',
    }]);
    const keyLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.keyLabelRef);
    expect(keyLabelNode.textContent).toBe('Key');
    const valueLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.valueLabelRef);
    expect(valueLabelNode.textContent).toBe('Value');
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    expect(addButtonNode.textContent).toBe('Add');
  });

  it('Does update key when key input changes', () => {
    const newKey = 'new key';
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput />,
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    ReactTestUtils.Simulate.change(keyInputNode, { target: { value: newKey } });
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: newKey,
      value: '',
    }]);
  });

  it('Does update value when value input changes', () => {
    const newValue = 'new value';
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput />,
    );
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    ReactTestUtils.Simulate.change(valueInputNode, { target: { value: newValue } });
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: '',
      value: newValue,
    }]);
  });

  it('Does add new key value pair when add button is clicked', () => {
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput />,
    );
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    ReactTestUtils.Simulate.click(addButtonNode);
    expect(keyValueInputComponent.state.value.toJS()).toEqual([
      {
        key: '',
        value: '',
      }, {
        key: '',
        value: '',
      },
    ]);
  });

  it('Does set initialValue of key value pairs', () => {
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }, {
      key: 'key 2',
      value: 'value 2',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput initialValue={initialValue} />,
    );
    expect(keyValueInputComponent.state.value.toJS()).toEqual(initialValue);
  });

  it('Does delete a key value pair when delete button is clicked', () => {
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }, {
      key: 'key 2',
      value: 'value 2',
    }, {
      key: 'key 3',
      value: 'value 3',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput initialValue={initialValue} />,
    );
    const deleteButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.deleteButtonRef1);
    ReactTestUtils.Simulate.click(deleteButtonNode);
    expect(keyValueInputComponent.state.value.toJS()).toEqual([
      {
        key: 'key 1',
        value: 'value 1',
      }, {
        key: 'key 3',
        value: 'value 3',
      },
    ]);
  });

  it('Does allow key label customization', () => {
    const myKeyLabel = 'My Key Label';
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput keyLabel={myKeyLabel} />,
    );
    const keyLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.keyLabelRef);
    expect(keyLabelNode.textContent).toBe(myKeyLabel);
  });

  it('Does allow value label customization', () => {
    const myValueLabel = 'My Value Label';
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput valueLabel={myValueLabel} />,
    );
    const valueLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.valueLabelRef);
    expect(valueLabelNode.textContent).toBe(myValueLabel);
  });

  it('Does allow add button text customization', () => {
    const myAddButtonText = 'A Really Cool Button';
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput addButtonText={myAddButtonText} />,
    );
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    expect(addButtonNode.textContent).toBe(myAddButtonText);
  });

  it('Does render a disabled KeyValueInput', () => {
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }, {
      key: 'key 2',
      value: 'value 2',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput
        enabled={false}
        initialValue={initialValue}
      />,
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    expect(keyInputNode.disabled).toBe(true);
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    expect(valueInputNode.disabled).toBe(true);
    const deleteButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.deleteButtonRef1);
    expect(deleteButtonNode.disabled).toBe(true);
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    expect(addButtonNode.disabled).toBe(true);
    const keyLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.keyLabelRef);
    expect(color(keyLabelNode.style.color).hexString())
      .toBe(TextColors.secondary);
    const valueLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.valueLabelRef);
    expect(color(valueLabelNode.style.color).hexString())
      .toBe(TextColors.secondary);
  });

  it('Does trigger an onChange event when a text input changes', () => {
    const newKey = 'new key';
    const mockHandleChange = jest.genMockFunction();
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput onChange={mockHandleChange} />,
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    ReactTestUtils.Simulate.change(keyInputNode, { target: { value: newKey } });
    expect(mockHandleChange).toBeCalledWith([
      {
        key: newKey,
        value: '',
      },
    ]);
  });

  it('Does trigger an onChange event when a delete button is clicked', () => {
    const mockHandleChange = jest.genMockFunction();
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }, {
      key: 'key 2',
      value: 'value 2',
    }, {
      key: 'key 3',
      value: 'value 3',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput
        initialValue={initialValue}
        onChange={mockHandleChange}
      />,
    );
    const deleteButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.deleteButtonRef1);
    ReactTestUtils.Simulate.click(deleteButtonNode);
    expect(mockHandleChange).toBeCalledWith([
      {
        key: 'key 1',
        value: 'value 1',
      }, {
        key: 'key 3',
        value: 'value 3',
      },
    ]);
  });

  it('Does trigger an onChange event when the add button is clicked', () => {
    const mockHandleChange = jest.genMockFunction();
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput
        initialValue={initialValue}
        onChange={mockHandleChange}
      />,
    );
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    ReactTestUtils.Simulate.click(addButtonNode);
    expect(mockHandleChange).toBeCalledWith([
      {
        key: 'key 1',
        value: 'value 1',
      }, {
        key: '',
        value: '',
      },
    ]);
  });

  it('Does validate as valid when all text boxes have content', () => {
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput initialValue={initialValue} />,
    );
    expect(keyValueInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: '',
    });
  });

  it('Does validate and detect isInitialValue change', () => {
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput initialValue={initialValue} />,
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    ReactTestUtils.Simulate.change(keyInputNode, { target: { value: 'another key' } });
    expect(keyValueInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: '',
    });
  });

  it('Does validate as invalid if a value is empty', () => {
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput />,
    );
    expect(keyValueInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: 'All Fields Must Not Be Empty',
    });
  });

  it('Does display success status', () => {
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput
        status={'success'}
      />,
    );
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    expect(valueInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.success}`);
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    expect(keyInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.success}`);
  });

  it('Does display error status', () => {
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput
        status={'error'}
      />,
    );
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    expect(valueInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.danger}`);
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    expect(keyInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.danger}`);
  });

  it('Does only display error status on invalid fields', () => {
    const initialValue = [{
      key: 'key 1',
      value: '',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput
        initialValue={initialValue}
        status={'error'}
      />,
    );
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    expect(valueInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.danger}`);
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    expect(keyInputNode.style.boxShadow).toBe('');
  });

  it('Does fail validation with duplicate keys when uniqueKeys=true', () => {
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }, {
      key: 'key 1',
      value: 'value 1',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput
        initialValue={initialValue}
        uniqueKeys={true}
      />,
    );
    expect(keyValueInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: 'All keys must be unique, found duplicate \'key 1\'',
    });
  });

  it('Does display error status on all duplicate key fields', () => {
    const initialValue = [{
      key: 'key 1',
      value: 'value 1',
    }, {
      key: 'key 2',
      value: 'value 1',
    }, {
      key: 'key 1',
      value: 'value 1',
    }];
    const keyValueInputComponent = ReactTestUtils.renderIntoDocument(
      <KeyValueInput
        initialValue={initialValue}
        uniqueKeys={true}
        status={'error'}
      />,
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    expect(keyInputNode.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.danger}`);
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    expect(valueInputNode.style.boxShadow).toBe('');
    const keyInputNode2 = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef1);
    expect(keyInputNode2.style.boxShadow).toBe('');
    const valueInputNode2 = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef1);
    expect(valueInputNode2.style.boxShadow).toBe('');
    const keyInputNode3 = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef2);
    expect(keyInputNode3.style.boxShadow).toBe(`0 0 3px 1px ${NoticeColors.danger}`);
    const valueInputNode3 = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef2);
    expect(valueInputNode3.style.boxShadow).toBe('');
  });
});
