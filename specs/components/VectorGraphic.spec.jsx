/* eslint func-names: "off" */

import React from 'react';
import VectorGraphic from '../../src/components/VectorGraphic';


describe('VectorGraphic', function () {
  this.header(`
  ## VectorGraphic
  `); // Markdown.

  this.loadSvg = (props) => {
    this.unload();
    this.load(
        <VectorGraphic>{props.children}</VectorGraphic>
    );
  };

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.loadSvg({
      children:
        <circle
          cx={'5'}
          cy={'5'}
          fill={'red'}
          r={'5'}
        ></circle>,
    });
  });

  it('Black Square', () => this.loadSvg({
    children:
      <g
        fill={'none'}
        fill-rule={'evenodd'}
        stroke={'none'}
        strokeWidth={'1'}
      >
        <rect
          fill={'black'}
          height={'10'}
          width={'10'}
          x={'0'}
          y={'0'}
        ></rect>
      </g>,
  }));

  it('Red Circle', () => this.loadSvg({
    children:
      <circle
        cx={'5'}
        cy={'5'}
        fill={'red'}
        r={'5'}
      ></circle>,
  }));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Vector Graphic

  A component for rendering SVG

  #### API

  - **chilren** *React.PropTypes.number* (optional) the SVG data to render
  - **height** *React.PropTypes.number* (optional) the SVG canvas height
  - **width** *React.PropTypes.number* (optional) the SVG canvas width

  `);
});
