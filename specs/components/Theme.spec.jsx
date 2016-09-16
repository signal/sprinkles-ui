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
      </Theme>
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

  - **children** *React.PropTypes.node* Children which are to receive the new styles
  - **color** *React.PropTypes.shape* (optional)
    - **backgroundColors** *React.PropTypes.object* (optional)
    - **buttonColors** *React.PropTypes.object* (optional)
    - **colors** *React.PropTypes.object* (optional) general colors used by other color props
    - **formColors** *React.PropTypes.object* (optional)
    - **iconColors** *React.PropTypes.object* (optional)
    - **structuralColors** *React.PropTypes.object* (optional)
    - **textColors** *React.PropTypes.object* (optional)
  `);
});
