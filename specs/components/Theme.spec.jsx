/* eslint func-names: "off" */

import React from 'react';
import Theme from '../../src/components/Theme';
import Button from '../../src/components/Button';

describe('Theme', function () {
  this.header(`
  ## Theme
  `); // Markdown.

  this.loadTheme = (props) => {
    this.unload();
    this.component(
      <Theme
        color={props.color}
      >
        <Button
          enabled={true}
          text={'Make me Pretty'}
          type={props.type}
        />
      </Theme>,
    );
  };

  before(() => {
    this.loadTheme({});
  });

  it('Change theme', () => this.loadTheme({
    color: {
      buttonColors: {
        secondary: '#991c26',
      },
      textColors: {
        light: '#fff',
        primary: '#ccc',
      },
    },
  }));
  it('Reset theme to default', () => this.loadTheme({
    color: undefined,
  }));
  it('Danger Button', () => this.loadTheme({
    color: {
      buttonColors: {
        secondary: '#991c26',
      },
    },
    type: 'danger',
  }));
  it('Warning Button', () => this.loadTheme({ type: 'warning' }));
  it('Success Button', () => this.loadTheme({ type: 'success' }));
  it('Info Button', () => this.loadTheme({ type: 'info' }));
  it('Primary Button', () => this.loadTheme({ type: 'primary' }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Theme

  Overrride the default theme with one of your choosing

  #### API

  - **children** *PropTypes.node* Children which are to receive the new styles
  - **color** *PropTypes.shape* (optional)
    - **backgroundColors** *PropTypes.object* (optional)
    - **buttonColors** *PropTypes.object* (optional)
    - **colors** *PropTypes.object* (optional) general colors used by other color props
    - **formColors** *PropTypes.object* (optional)
    - **iconColors** *PropTypes.object* (optional)
    - **structuralColors** *PropTypes.object* (optional)
    - **textColors** *PropTypes.object* (optional)
  `);
});
