// don't mock our CUT or components it depends on
jest.dontMock('../src/components/Alert');
jest.dontMock('../src/components/Text');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import color from 'color';
import { Colors } from '../src/shared/colors';

// TODO: move this to es6 style import when its implemented in jest
const Alert = require('../src/components/Alert').default;

function testColor(messageType) {
  let colorToTest;
  const alertComponent = TestUtils.renderIntoDocument(
    <Alert
      details={'Some description'}
      type={messageType}
    />
  );
  switch (messageType) {
    case 'success':
      colorToTest = Colors.success;
      break;
    case 'info':
      colorToTest = Colors.info;
      break;
    case 'warning':
      colorToTest = Colors.warning;
      break;
    case 'danger':
      colorToTest = Colors.danger;
      break;
    default:
      break;
  }
  const alertNode = ReactDOM.findDOMNode(alertComponent);
  expect(color(alertNode.style.backgroundColor).hexString()).toBe(colorToTest);
}

fdescribe('Alert Message', () => {
  it('Does render an info Alert Message with description', () => {
    const description = 'An info message';
    const alertComponent = TestUtils.renderIntoDocument(
      <Alert
        details={description}
        type={'info'}
      />
    );
    const detailsNode = ReactDOM.findDOMNode(alertComponent.detailsRef);
    expect(detailsNode.textContent).toBe(description);
  });

  it('Does render an info Alert Message with description and title', () => {
    const description = 'An info message';
    const title = 'Info title';
    const alertComponent = TestUtils.renderIntoDocument(
      <Alert
        details={description}
        title={title}
        type={'info'}
      />
    );
    const titleNode = ReactDOM.findDOMNode(alertComponent.titleRef);
    const detailsNode = ReactDOM.findDOMNode(alertComponent.detailsRef);
    expect(detailsNode.textContent).toBe(description);
    expect(titleNode.textContent).toBe(title);
  });
  it('Displays the correct color for the success type', () => {
    testColor('success');
  });
  it('Displays the correct color for the info type', () => {
    testColor('info');
  });
  it('Displays the correct color for the warning type', () => {
    testColor('warning');
  });
  it('Displays the correct color for the danger type', () => {
    testColor('danger');
  });
});
