import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TableCell from '../src/components/TableCell';

let tableCellComponent;
let tableNode;
let tableCellNode;

const renderCell = (props) => {
  const theProps = props || { rowIndex: 0 };
  tableCellComponent = TestUtils.renderIntoDocument(
    <table>
      <tbody>
        <tr>
          <TableCell
            colSpan={theProps.colSpan}
            children={theProps.children}
            onClick={theProps.onClick}
            width={theProps.width}
          />
        </tr>
      </tbody>
    </table>
  );
  tableNode = ReactDOM.findDOMNode(tableCellComponent);
  tableCellNode = tableNode.getElementsByTagName('td')[0];
};

describe('TableCell', () => {
  beforeEach(() => {
    renderCell();
  });
  it('does render a TableCell', () => {
    expect(tableCellComponent).toBeDefined();
  });
  it('does render a TableCell with colSpan', () => {
    renderCell({
      colSpan: 2,
    });
    expect(tableCellNode.colSpan).toBe('2');
  });
  it('does render a TableCell with children', () => {
    renderCell({
      children: <p>Test</p>,
    });
    expect(tableCellNode.getElementsByTagName('p')[0]).toBeDefined();
  });
  it('calls onClick when clicked', () => {
    const mockHandleClick = jest.fn();
    renderCell({
      onClick: mockHandleClick,
    });
    TestUtils.Simulate.click(tableCellNode);
    expect(mockHandleClick).toBeCalled();
  });
  it('sets a width', () => {
    renderCell({
      width: '10px',
    });
    expect(tableCellNode.style.width).toBe('10px');
  });
});
