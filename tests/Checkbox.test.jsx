import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Checkbox from '../src/components/Checkbox';

describe('Checkbox', () => {
  it('Does render a disabled checkbox input', () => {
    const checkBoxComponent = ReactTestUtils.renderIntoDocument(
      <Checkbox
        enabled={false}
      />,
    );
    const checkBoxNode = ReactDOM.findDOMNode(checkBoxComponent);
    expect(checkBoxNode.disabled).toBe(true);
  });

  it('Does render an unchecked Checkbox component', () => {
    const checkboxComponent = ReactTestUtils.renderIntoDocument(
      <Checkbox
        checked={false}
      />,
    );
    expect(checkboxComponent).toBeDefined();
    expect(checkboxComponent.props.checked).toBe(false);
  });

  it('Does render a selected Checkbox component', () => {
    const checkboxComponent = ReactTestUtils.renderIntoDocument(
      <Checkbox
        checked={true}
      />,
    );
    expect(checkboxComponent.props.checked).toBe(true);
  });
});
