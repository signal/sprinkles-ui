import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import InputItem from '../../src/components/forms/InputItem';
import TextInput from '../../src/components/forms/TextInput';

describe('InputItem', () => {
  it('Does render an InputItem', () => {
    const inputItemComponent = TestUtils.renderIntoDocument(
      <InputItem
        fieldName={'foo'}
        label={'Foo'}
      >
        <TextInput fieldId={'foo'} />
      </InputItem>
    );
    expect(inputItemComponent).toBeDefined();
  });

  it('Does render children', () => {
    const inputItemComponent = TestUtils.renderIntoDocument(
      <InputItem
        fieldName={'foo'}
        label={'Foo'}
      >
        <TextInput fieldId={'foo'} />
      </InputItem>
    );
    const inputItemNode = ReactDOM.findDOMNode(inputItemComponent);
    const input = inputItemNode.getElementsByTagName('input')[0];

    expect(input).toBeDefined();
  });
});
