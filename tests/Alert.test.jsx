import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import color from 'color';
import { NoticeColors } from '../src/shared/colors';
import Alert from '../src/components/Alert';

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
      colorToTest = NoticeColors.success;
      break;
    case 'info':
      colorToTest = NoticeColors.info;
      break;
    case 'warning':
      colorToTest = NoticeColors.warning;
      break;
    case 'danger':
      colorToTest = NoticeColors.danger;
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
