import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import color from 'color';
import { Colors } from '../src/shared/colors';
import Field from '../src/components/Field';
import TextInput from '../src/components/TextInput';


describe('Field', () => {
  it('Does render a Field with an input', () => {
    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field fieldKey={'key'} />
    );
    // grab the DOM node so we can inspect it
    const fieldNode = ReactDOM.findDOMNode(fieldComponent);
    expect(fieldNode.textContent).toEqual('');
  });

  it('Does render a Field with a label', () => {
    const text = 'howdy';
    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        label={text}
      />
    );
    // grab the DOM node so we can inspect it
    const labelRef = ReactDOM.findDOMNode(fieldComponent.labelRef);
    expect(labelRef.textContent).toEqual(text);
  });

  it('Does render a Field with an error status', () => {
    const text = 'howdy';
    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        label={text}
        status={'error'}
      >
        <TextInput />
      </Field>
    );
    // grab the label and input DOM nodes so we can inspect them
    const labelNode = ReactDOM.findDOMNode(fieldComponent.labelRef);
    const inputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);
    expect(color(labelNode.style.color).hexString()).toBe(Colors.danger);
    expect(inputNode.style.boxShadow).toBe(`0 0 3px 1px ${Colors.danger}`);
  });

  it('Does render a Field with a warning status', () => {
    const text = 'howdy';
    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        label={text}
        status={'warning'}
      >
        <TextInput />
      </Field>
    );

    // grab the label and input DOM nodes so we can inspect them
    const labelNode = ReactDOM.findDOMNode(fieldComponent.labelRef);
    const inputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);

    expect(color(labelNode.style.color).hexString()).toBe(Colors.warning);
    expect(inputNode.style.boxShadow).toBe(`0 0 3px 1px ${Colors.warning}`);
  });

  it('Does render a Field with a success status', () => {
    const text = 'howdy';
    // Render an Field
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        label={text}
        status={'success'}
      >
        <TextInput />
      </Field>
    );
    // grab the label and input DOM nodes so we can inspect them
    const labelNode = ReactDOM.findDOMNode(fieldComponent.labelRef);
    const inputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);
    expect(color(labelNode.style.color).hexString()).toBe(Colors.success);
    expect(inputNode.style.boxShadow).toBe(`0 0 3px 1px ${Colors.success}`);
  });

  it('Does render a Field with an error message', () => {
    const errMessage = 'Some error occured';
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        error={errMessage}
      />
    );
    const errorNode = ReactDOM.findDOMNode(fieldComponent.errorRef);
    expect(errorNode.textContent).toBe(errMessage);
  });

  it('Does validate a Field with input missing isValid function', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field fieldKey={'key'} />
    );
    expect(fieldComponent.validate()).toEqual({
      valid: true,
      required: false,
      isInitialValue: true,
      validationError: '',
    });
  });

  it('Does render a required Field', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        required={true}
      />
    );
    const requiredNode = ReactDOM.findDOMNode(fieldComponent.requiredRef);
    expect(requiredNode.textContent).toBe('*');
    expect(color(requiredNode.style.color).hexString()).toBe(Colors.danger);
  });

  it('Does render a required Field width asterick hidden', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        required={true}
        requriedAsteriskDisplay={false}
      />
    );
    const requiredNode = ReactDOM.findDOMNode(fieldComponent.requiredRef);
    expect(requiredNode).toBe(null);
  });

  it('Does validate a required Field with valid input as valid', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        required={true}
      >
        <TextInput initialValue={'a'} />
      </Field>
    );

    expect(fieldComponent.validate()).toEqual({
      valid: true,
      required: true,
      isInitialValue: true,
      validationError: '',
    });
  });

  it('Does validate a required Field with invalid input as invalid', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        required={true}
      >
        <TextInput initialValue={''} />
      </Field>
    );

    expect(fieldComponent.validate()).toEqual({
      valid: false,
      required: true,
      isInitialValue: true,
      validationError: 'Field Must Not Be Empty',
    });
  });

  it('Does validate an optional Field with valid input as valid', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        required={false}
      >
        <TextInput initialValue={'a'} />
      </Field>
    );
    expect(fieldComponent.validate()).toEqual({
      valid: true,
      required: false,
      isInitialValue: true,
      validationError: '',
    });
  });

  it('Does validate an optional Field with invalid input as valid', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        required={false}
      >
        <TextInput initialValue={''} />
      </Field>
    );
    expect(fieldComponent.validate()).toEqual({
      valid: false,
      required: false,
      isInitialValue: true,
      validationError: 'Field Must Not Be Empty',
    });
  });

  it('Does trigger onChange when the input changes', () => {
    const change = 'changed value';
    const mockHandleChange = jest.genMockFunction();
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        onChange={mockHandleChange}
      >
        <TextInput />
      </Field>
    );
    const textInputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);
    TestUtils.Simulate.change(textInputNode, { target: { value: change } });
    expect(mockHandleChange).toBeCalledWith(change, fieldComponent);
  });

  it('Does render a disabled Field', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        enabled={false}

      >
        <TextInput />
      </Field>
    );
    const textInputNode = ReactDOM.findDOMNode(fieldComponent.inputRef);
    expect(textInputNode.disabled).toBe(true);
  });

  it('Does render a label positioned left', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        label={'Test'}
        labelPosition={'left'}

      >
        <TextInput />
      </Field>
    );
    const labelRefParent = ReactDOM.findDOMNode(fieldComponent.labelRef).parentNode;
    expect(labelRefParent.style.width).toEqual('23%');
    const textInputNodeParent = ReactDOM.findDOMNode(fieldComponent.inputRef).parentNode;
    expect(textInputNodeParent.style.flex).toBe('1');
  });

  it('Does render a label positioned top', () => {
    const fieldComponent = TestUtils.renderIntoDocument(
      <Field
        fieldKey={'key'}
        label={'Test'}
        labelPosition={'top'}

      >
        <TextInput />
      </Field>
    );
    const labelRefParent = ReactDOM.findDOMNode(fieldComponent.labelRef).parentNode;
    expect(labelRefParent.style.marginRight).toEqual('');
    const textInputNodeParent = ReactDOM.findDOMNode(fieldComponent.inputRef).parentNode;
    expect(textInputNodeParent.style.flex).toBe(undefined);
  });
});
