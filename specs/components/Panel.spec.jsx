/* eslint func-names: "off" */

import React from 'react';
import Panel from '../../src/components/Panel';

describe('Panel', function () {
  this.header(`
  ## Panel
  `); // Markdown.

  this.loadPanel = (props) => {
    this.unload();
    this.component(
      <Panel
        backgroundColor={props.backgroundColor}
        borderColor={props.borderColor}
        borderRadius={props.borderRadius}
        boxShadowStrength={props.boxShadowStrength}
        color={props.color}
        padding={props.padding}
        text={props.text}
      >
        {props.children}
      </Panel>,
    ).width('100%');
  };

  before(() => {
    this.loadPanel({
      text: 'Test',
    });
  });

  it('DropShadow Strength 0', () => this.loadPanel({
    boxShadowStrength: undefined,
    text: 'Indéfini',
  }));
  it('DropShadow Strength 1', () => this.loadPanel({
    boxShadowStrength: 1,
    text: 'Eins',
  }));
  it('DropShadow Strength 2', () => this.loadPanel({
    boxShadowStrength: 2,
    text: 'Dos',
  }));
  it('DropShadow Strength 3', () => this.loadPanel({
    boxShadowStrength: 3,
    text: 'Tre',
  }));
  it('DropShadow Strength 4', () => this.loadPanel({
    boxShadowStrength: 4,
    text: 'IV',
  }));
  it('DropShadow Strength 5', () => this.loadPanel({
    boxShadowStrength: 5,
    text: 'пять',
  }));
  it('Update BackgroundColor', () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    this.loadPanel({
      backgroundColor: `#${color}`,
      text: 'Sheild yo eyes!',
    });
  });
  it('Update Color', () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    this.loadPanel({
      color: `#${color}`,
      text: 'Sheild yo eyes!',
    });
  });
  it('No Rounded Corners', () => this.loadPanel({
    borderRadius: undefined,
    text: 'Look ma, no rounded corners',
  }));
  it('Small Rounded Corners Radius', () => this.loadPanel({
    backgroundColor: '#999999',
    borderRadius: 2,
    text: 'It was an itsy bitsy',
  }));
  // A noble spirit embiggens the smallest man ;)
  it('Embiggen Rounded Corners', () => this.loadPanel({
    backgroundColor: '#999999',
    borderRadius: 20,
    text: 'Jebediah',
  }));
  it('Show with Children', () => this.loadPanel({
    children: <div>{'Hello Children'}</div>,
  }));
  it('Show with Text', () => this.loadPanel({
    children: undefined,
    text: 'Testy Testing',
  }));
  it('Show with border', () => this.loadPanel({
    borderColor: 'green',
    children: undefined,
    text: 'Hiya',
  }));
  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Panel

  An element used for grouping other items visually.

  #### API

  - **backgroundColor** *PropTypes.string* (optional) overides default background color of white
  - **borderRadius** *PropTypes.number* Sets a borderRadius to the specified strength
  - **boxShadowStrength** *PropTypes.number* Sets a boxShadow to the specified strength
  - **children** *PropTypes.node* (optional) overides text, render children of any kind inside the panel
  - **color** *PropTypes.string* (optional) overides default text color of black
  - **padding** *PropTypes.string* (optiona) overides default padding, expressed as '10px 10px 10px 10px'
  - **text** *PropTypes.string* (optional) sets text to be displayed
  `);
});
