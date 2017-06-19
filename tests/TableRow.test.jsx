import color from 'color';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { BackgroundColors } from '../src/shared/colors';
import TableRow from '../src/components/TableRow';
import { getGlamorStylesFromClassList } from './util';

let tableRowComponent;
let tableNode;
let tableRowNode;

const renderRow = (props) => {
  const theProps = props || { rowIndex: 0 };
  tableRowComponent = ReactTestUtils.renderIntoDocument(
    <table>
      <tbody>
        <TableRow
          isHoverable={theProps.isHoverable}
          isSelected={theProps.isSelected}
          rowIndex={theProps.rowIndex}
          style={theProps.style}
        >
          {theProps.children}
        </TableRow>
      </tbody>
    </table>,
  );
  tableNode = ReactDOM.findDOMNode(tableRowComponent);
  tableRowNode = tableNode.getElementsByTagName('tr')[0];
};

describe('TableRow', () => {
  beforeEach(() => {
    renderRow();
  });

  it('does render a TableRow', () => {
    expect(tableRowComponent).toBeDefined();
  });
  it('does render a hover effect for a table row element', () => {
    renderRow({
      isHoverable: true,
      rowIndex: 0,
    });
    const style = getGlamorStylesFromClassList(tableRowNode.classList);
    expect(color(style['&:hover'].background).hexString())
      .toBe(color(BackgroundColors.hover).hexString());
  });
  it('does render a selected effect for a table row element', () => {
    renderRow({
      isSelected: true,
      rowIndex: 0,
    });
    const style = getGlamorStylesFromClassList(tableRowNode.classList);
    expect(color(style.background).hexString())
      .toBe(color(BackgroundColors.selected).hexString());
  });
  it('does not render a hover or active effect for a table row element without these props', () => {
    ReactTestUtils.Simulate.mouseOver(tableRowNode);
    expect(tableRowNode.style.background).toBe('');
  });
  it('does render children', () => {
    renderRow({
      children: <td>Child</td>,
      rowIndex: 0,
    });
    expect(tableRowNode.getElementsByTagName('td')[0]).toBeDefined();
  });
  it('can apply custom CSS', () => {
    renderRow({
      rowIndex: 0,
      style: { background: '#888888' },
    });
    const style = getGlamorStylesFromClassList(tableRowNode.classList);
    expect(color(style.background).hexString())
      .toBe(color('#888888').hexString());
  });
});
