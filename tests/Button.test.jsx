import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import color from 'color';
import { ButtonColors } from '../src/shared/colors';
import Button from '../src/components/Button';
import Text from '../src/components/Text';

describe('Button', () => {
  it('Does render a Button with default text', () => {
    const text = 'Submit';
    // Render a Button
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button />
    );
    // grab the DOM node so we can inspect it
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.innerHTML).toEqual(text);
  });

  it('Does disable Button when working is true', () => {
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button working={true} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect({}.hasOwnProperty.call(buttonNode.attributes, 'disabled')).toEqual(true);
  });

  it('Does not disable Button when working is false', () => {
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button working={false} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect({}.hasOwnProperty.call(buttonNode.attributes, 'disabled')).toEqual(false);
  });

  it('Does not disable Button when enabled is true', () => {
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button enabled={true} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect({}.hasOwnProperty.call(buttonNode.attributes, 'disabled')).toEqual(false);
  });

  it('Does disable Button when enabled is false', () => {
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button enabled={false} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect({}.hasOwnProperty.call(buttonNode.attributes, 'disabled')).toEqual(true);
  });

  it('Does render a button of each type', () => {
    ['secondary', 'primary', 'danger', 'warning', 'success', 'info'].forEach((type) => {
      const buttonComponent = TestUtils.renderIntoDocument(
        <Button type={type} />
      );
      // grab the DOM node so we can inspect it
      const buttonNode = ReactDOM.findDOMNode(buttonComponent);
      expect(color(buttonNode.style.background).hexString()).toBe(ButtonColors[type]);
      expect(color(buttonNode.style['border-bottom-color']).hexString())
        .toBe(color(ButtonColors[type]).darken(0.3).hexString());
    });
  });

  it('Does render a disabled button of each type', () => {
    ['secondary', 'primary', 'danger', 'warning', 'success', 'info'].forEach((type) => {
      const buttonComponent = TestUtils.renderIntoDocument(
        <Button
          enabled={false}
          type={type}
        />
      );
      // grab the DOM node so we can inspect it
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
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button>
        <Text>{childText}</Text>
      </Button>
    );
    const buttonTextNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonTextNode.textContent).toBe(childText);
  });

  it('Does render a left position button', () => {
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button groupPosition={'left'} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.style.borderRadius).toBe('3px 0 0 3px');
  });

  it('Does render a center position button', () => {
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button groupPosition={'center'} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.style.borderRadius).toBe('0');
    expect(buttonNode.style.borderLeft).toBe('0');
  });

  it('Does render a right position button', () => {
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button groupPosition={'right'} />
    );
    const buttonNode = ReactDOM.findDOMNode(buttonComponent);
    expect(buttonNode.style.borderRadius).toBe('0 3px 3px 0');
    expect(buttonNode.style.borderLeft).toBe('0');
  });
});
