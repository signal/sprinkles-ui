/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import Alert from '../../src/components/Alert';
import Text from '../../src/components/Text';

describe('Alert', function () {
  this.header(`
  ## Alert Message
  `); // Markdown.

  this.loadAlert = (props) => {
    this.unload();
    this.component(
      <Alert
        details={props.details}
        title={props.title}
        type={props.type}
      >
        {props.children}
      </Alert>
    ).width('100%');
  };

  before(() => {
    this.loadAlert({
      details: 'Test',
      type: 'info',
    });
  });

  it('Success message', () => this.loadAlert({
    details: 'Yay! It worked',
    title: '',
    type: 'success',
  }));
  it('Success message with title', () => this.loadAlert({
    details: 'Yay! It worked',
    title: 'WOW',
    type: 'success',
  }));
  it('Info message', () => this.loadAlert({
    details: 'This is some information you might like',
    title: '',
    type: 'info',
  }));
  it('Info message with title', () => this.loadAlert({
    details: 'This is some information you might like',
    title: 'Note',
    type: 'info',
  }));
  it('Warning message', () => this.loadAlert({
    details: 'Be careful you might run into a problem',
    title: '',
    type: 'warning',
  }));
  it('Warning message with title', () => this.loadAlert({
    details: 'Be careful you might run into a problem',
    title: 'Caution:',
    type: 'warning',
  }));
  it('Danger message', () => this.loadAlert({
    children: null,
    details: 'Yikes! You dun broke it',
    title: '',
    type: 'danger',
  }));
  it('Danger message with title', () => this.loadAlert({
    children: (
      <Text
        color={'white'}
        fontSize={1.5}
      >
        {'You dun broke it'}
      </Text>
    ),
    title: 'Warning!',
    type: 'danger',
  }));
  it('Danger message with child nodes', () => this.loadAlert({
    title: 'Please reset your password using the following criteria:',
    type: 'danger',
    children: (
      <div>
        <div
          style={{
            padding: '10px 0 5px 0',
          }}
        >
          <Text
            color={'white'}
            fontSize={0.8}
          >
            {'◼︎ At least 1 special character (e.g. ][?/<~!$#%)'}
          </Text>
        </div>
        <div
          style={{
            padding: '10px 0 5px 0',
          }}
        >
          <Text
            color={'white'}
            fontSize={0.8}
          >
            {'◼︎ At least 1 numeric character'}
          </Text>
        </div>
      </div>
    ),
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A component that provides contextural feedback messages for typical user actions.

  #### API
  - **details** *React.PropTypes.oneOfType* string description or array of descriptions
  - **title** *React.PropTypes.string* (optional) Bold qualifier of message
  - **type** *React.PropTypes.oneOf* Sets the color of the alert message, one option must be specified: 'success', 'info', 'warning', 'danger'

  `);
});
