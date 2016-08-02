import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// don't mock our CUT or components it depends on
jest.dontMock('../src/components/VectorGraphic');

// TODO: move this to es6 style import when its implemented in jest
const VectorGraphic = require('../src/components/VectorGraphic').default;

describe('VectorGraphic', () => {
  it('Does render an VectorGraphic element', () => {
    const svgComponent = TestUtils.renderIntoDocument(
      <VectorGraphic />
    );
    const svgNode = ReactDOM.findDOMNode(svgComponent);
    expect(svgNode.nodeName).toEqual('svg');
  });

  it('Does render an SVG element with children', () => {
    const svgComponent = TestUtils.renderIntoDocument(
      <VectorGraphic>
        <g
          fill={'none'}
          fillRule={'evenodd'}
          stroke={'none'}
          strokeWidth={'1'}
        >
          <rect
            fill={'black'}
            height={'10'}
            width={'10'}
            x={'0'}
            y={'0'}
          />
        </g>
      </VectorGraphic>
    );
    const svgNode = ReactDOM.findDOMNode(svgComponent);
    expect(svgNode.children).not.toEqual({});
  });
});
