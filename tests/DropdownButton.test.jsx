import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import color from 'color';
import { ButtonColors } from '../src/shared/colors';
import DropdownButton from '../src/components/DropdownButton';
import Text from '../src/components/Text';

describe('ButtonDropdown', () => {
  let buttonComponent;

  beforeEach(() => {
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton />
    );
  });

  it('Does render a Button with default text', () => {
    const text = 'Submit';
    const buttonNode = ReactDOM.findDOMNode(buttonComponent.buttonDropdownContentRef);
    expect(buttonNode.innerHTML).toEqual(text);
  });

  it('Does render a Button with a default arrow', () => {
    const buttonNode = ReactDOM.findDOMNode(buttonComponent.buttonDropdownArrowRef);
    expect(buttonNode.style.borderLeft).toEqual('4px solid transparent');
    expect(buttonNode.style.borderRight).toEqual('4px solid transparent');
    expect(buttonNode.style.borderTop).toEqual('4px dashed');
  });

  it('Does disable Button when working is true', () => {
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton working={true} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect({}.hasOwnProperty.call(buttonNode.attributes, 'disabled')).toEqual(true);
  });

  it('Does not disable Button when working is false', () => {
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton working={false} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect({}.hasOwnProperty.call(buttonNode.attributes, 'disabled')).toEqual(false);
  });

  it('Does not disable Button when enabled is true', () => {
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton enabled={true} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect({}.hasOwnProperty.call(buttonNode.attributes, 'disabled')).toEqual(false);
  });

  it('Does disable Button when enabled is false', () => {
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton enabled={false} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect({}.hasOwnProperty.call(buttonNode.attributes, 'disabled')).toEqual(true);
  });

  it('Does render a button of each type', () => {
    ['secondary', 'primary', 'danger', 'warning', 'success', 'info'].forEach((type) => {
      buttonComponent = TestUtils.renderIntoDocument(
        <DropdownButton type={type} />
      );
      const buttonNode = ReactDOM.findDOMNode(buttonComponent);
      expect(color(buttonNode.style.background).hexString()).toBe(ButtonColors[type]);
      expect(color(buttonNode.style['border-bottom-color']).hexString())
        .toBe(color(ButtonColors[type]).darken(0.3).hexString());
    });
  });

  it('Does render a disabled button of each type', () => {
    ['secondary', 'primary', 'danger', 'warning', 'success', 'info'].forEach((type) => {
      buttonComponent = TestUtils.renderIntoDocument(
        <DropdownButton
          enabled={false}
          type={type}
        />
      );
      const buttonNode = ReactDOM.findDOMNode(buttonComponent);
      if (type === 'secondary') {
        expect(color(buttonNode.style.background).hexString())
          .toBe(color(ButtonColors[type]).darken(0.1).hexString());
      } else {
        expect(color(buttonNode.style.background).hexString())
          .toBe(color(ButtonColors[type]).lighten(0.3).hexString());
      }
      expect(color(buttonNode.style['border-bottom-color']).hexString())
        .toBe(color(ButtonColors[type]).darken(0.3).hexString());
      expect(buttonNode.style.cursor).toBe('not-allowed');
    });
  });

  it('Does render a button with a child element', () => {
    const childText = 'Howdy';
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton>
        <Text>{childText}</Text>
      </DropdownButton>
    );
    const buttonTextNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonTextNode.textContent).toBe(childText);
  });

  it('Does render a left position button', () => {
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton groupPosition={'left'} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.style.borderRadius).toBe('3px 0 0 3px');
  });

  it('Does render a center position button', () => {
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton groupPosition={'center'} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.style.borderRadius).toBe('0');
    expect(buttonNode.style.borderLeft).toBe('0');
  });

  it('Does render a right position button', () => {
    buttonComponent = TestUtils.renderIntoDocument(
      <DropdownButton groupPosition={'right'} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.style.borderRadius).toBe('0 3px 3px 0');
    expect(buttonNode.style.borderLeft).toBe('0');
  });
});
