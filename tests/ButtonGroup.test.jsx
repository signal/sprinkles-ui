import color from 'color';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { ButtonColors } from '../src/shared/colors';

jest.dontMock('../src/components/ButtonGroup');
jest.dontMock('../src/components/Button');

const ButtonGroup = require('../src/components/ButtonGroup').default;
const Button = require('../src/components/Button').default;

describe('ButtonGroup', () => {
  it('Does render an empty ButtonGroup', () => {
    const component = TestUtils.renderIntoDocument(
      <ButtonGroup />
    );
    expect(component).toBeDefined();
  });

  it('Does render a button group with child buttons', () => {
    const component = TestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button buttonKey={'1'} />
        <Button buttonKey={'2'} />
        <Button buttonKey={'3'} />
      </ButtonGroup>
    );
    ['1', '2', '3'].forEach((buttonRef) => {
      expect(component.buttonRefs.get(buttonRef)).toBeDefined();
    });
  });

  it('Does throw an error if Button doesn\'t have buttonKey prop', () => {
    expect(() => TestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button buttonKey={'1'} />
        <Button />
        <Button buttonKey={'3'} />
      </ButtonGroup>
    )).toThrow(new Error('Button missing buttonKey prop'));
  });

  it('Does throw an error if a buttonKey prop is not unique', () => {
    expect(() => TestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button buttonKey={'1'} />
        <Button buttonKey={'1'} />
        <Button buttonKey={'3'} />
      </ButtonGroup>
    )).toThrow(new Error('buttonKey prop \'1\' is not unique'));
  });

  it('Does trigger onClick when a button is clicked', () => {
    const buttonKey = '1';
    const mockHandleClick = jest.genMockFunction();
    const component = TestUtils.renderIntoDocument(
      <ButtonGroup onClick={mockHandleClick}>
        <Button buttonKey={buttonKey} />
      </ButtonGroup>
    );
    const buttonNode = ReactDOM.findDOMNode(component.buttonRefs.get(buttonKey));
    TestUtils.Simulate.click(buttonNode);
    expect(mockHandleClick).toBeCalledWith(buttonKey);
  });

  it('Does display one button with correct borderRadius', () => {
    const buttonKey = '1';
    const component = TestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button buttonKey={buttonKey} />
      </ButtonGroup>
    );
    const buttonNode = ReactDOM.findDOMNode(component.buttonRefs.get(buttonKey));
    expect(buttonNode.style.borderRadius).toBe('3px');
  });

  it('Does display two buttons with correct borderRadius', () => {
    const component = TestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button buttonKey={'1'} />
        <Button buttonKey={'2'} />
      </ButtonGroup>
    );
    const buttonNodeOne = ReactDOM.findDOMNode(component.buttonRefs.get('1'));
    const buttonNodeTwo = ReactDOM.findDOMNode(component.buttonRefs.get('2'));
    expect(buttonNodeOne.style.borderRadius).toBe('3px 0 0 3px');
    expect(buttonNodeTwo.style.borderRadius).toBe('0 3px 3px 0');
  });

  it('Does display 3+ buttons with correct borderRadius', () => {
    const component = TestUtils.renderIntoDocument(
      <ButtonGroup>
        <Button buttonKey={'1'} />
        <Button buttonKey={'2'} />
        <Button buttonKey={'3'} />
      </ButtonGroup>
    );
    const buttonNodeOne = ReactDOM.findDOMNode(component.buttonRefs.get('1'));
    const buttonNodeTwo = ReactDOM.findDOMNode(component.buttonRefs.get('2'));
    const buttonNodeThree = ReactDOM.findDOMNode(component.buttonRefs.get('3'));
    expect(buttonNodeOne.style.borderRadius).toBe('3px 0 0 3px');
    expect(buttonNodeTwo.style.borderRadius).toBe('0');
    expect(buttonNodeThree.style.borderRadius).toBe('0 3px 3px 0');
  });

  it('Does render all child buttons with expected type', () => {
    const component = TestUtils.renderIntoDocument(
      <ButtonGroup type={'danger'}>
        <Button buttonKey={'1'} />
        <Button buttonKey={'2'} />
        <Button buttonKey={'3'} />
      </ButtonGroup>
    );
    ['1', '2', '3'].forEach((buttonRef) => {
      const buttonNode = ReactDOM.findDOMNode(component.buttonRefs.get(buttonRef));
      expect(color(buttonNode.style.background).hexString()).toBe(ButtonColors.danger);
    });
  });

  it('Does render a selected button in a button group', () => {
    const component = TestUtils.renderIntoDocument(
      <ButtonGroup
        selectedButton={'1'}
      >
        <Button buttonKey={'1'} />
        <Button buttonKey={'2'} />
        <Button buttonKey={'3'} />
      </ButtonGroup>
    );
    const buttonNodeOne = ReactDOM.findDOMNode(component.buttonRefs.get('1'));
    const buttonNodeTwo = ReactDOM.findDOMNode(component.buttonRefs.get('2'));
    const buttonNodeThree = ReactDOM.findDOMNode(component.buttonRefs.get('3'));
    expect(color(buttonNodeOne.style.background).hexString()).toBe(ButtonColors.primary);
    expect(color(buttonNodeTwo.style.background).hexString()).toBe(ButtonColors.secondary);
    expect(color(buttonNodeThree.style.background).hexString()).toBe(ButtonColors.secondary);
  });
});
