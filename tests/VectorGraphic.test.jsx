import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import VectorGraphic from '../src/components/VectorGraphic';

describe('VectorGraphic', () => {
  it('Does render an VectorGraphic element', () => {
    const svgComponent = ReactTestUtils.renderIntoDocument(
      <VectorGraphic />,
    );
    const svgNode = ReactDOM.findDOMNode(svgComponent);
    expect(svgNode.nodeName).toEqual('svg');
  });

  it('Does render an SVG element with children', () => {
    const svgComponent = ReactTestUtils.renderIntoDocument(
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
      </VectorGraphic>,
    );
    const svgNode = ReactDOM.findDOMNode(svgComponent);
    expect(svgNode.children).not.toEqual({});
  });
});
