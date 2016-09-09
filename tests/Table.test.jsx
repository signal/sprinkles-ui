import color from 'color';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { BackgroundColors } from '../src/shared/colors';
import Table from '../src/components/Table';

const recordsAltOrdered = [
  { name: 'Sue',
    color: 'blue',
    age: 25,
  },
  { name: 'Frank',
    color: 'green',
    age: 20,
  },
];

const headers = {
  name: 'Name',
  age: 'Age',
  color: 'Favorite Color',
};
const records = [
{ name: 'Sue',
  age: 25,
  color: 'blue',
},
{ name: 'Frank',
  age: 20,
  color: 'green',
},
{ name: 'Larry',
  age: 39,
  color: 'red',
},
{ name: 'Jose',
  age: 25,
  color: 'purple',
},
{ name: 'Peter',
  age: 28,
  color: 'blue',
}];

describe('Table', () => {
  it('Does render a Table', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        headers={headers}
        records={records}
      />
    );
    expect(tableComponent).toBeDefined();
  });
  it('Does render a Table with headers', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        headers={headers}
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const tHead = tableNode.getElementsByTagName('thead')[0];
    expect(tHead).toBeDefined();
    const firstTableHeaderElement = tHead.getElementsByTagName('th')[0];
    expect(firstTableHeaderElement.textContent)
      .toBe('Name');
    const secondTableHeaderElement = tHead.getElementsByTagName('th')[1];
    expect(secondTableHeaderElement.textContent)
      .toBe('Age');
    const thirdTableHeaderElement = tHead.getElementsByTagName('th')[2];
    expect(thirdTableHeaderElement.textContent)
      .toBe('Favorite Color');
  });
  it('Renders a Table without headers specified', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const tHead = tableNode.getElementsByTagName('thead')[0];
    expect(tHead).toBeDefined();
    const firstTableHeaderElement = tHead.getElementsByTagName('th')[0];
    expect(firstTableHeaderElement.textContent)
      .toBe('name');
    const secondTableHeaderElement = tHead.getElementsByTagName('th')[1];
    expect(secondTableHeaderElement.textContent)
      .toBe('age');
    const thirdTableHeaderElement = tHead.getElementsByTagName('th')[2];
    expect(thirdTableHeaderElement.textContent)
      .toBe('color');
  });
  it('Does render a Table with a body', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        headers={headers}
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    expect(tableNode.getElementsByTagName('tbody')[0]).toBeDefined();
  });
  it('Does render a Table with cells', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        headers={headers}
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const tRowCells = tableNode.getElementsByTagName('tbody')[0].getElementsByTagName('td').length;
    expect(tRowCells).toBe(15);
  });
  it('Renders a Table with limited data selected', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        headers={headers}
        records={records}
        recordInclusion={['name', 'age']}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const tRowCells = tableNode.getElementsByTagName('tbody')[0].getElementsByTagName('td').length;
    expect(tRowCells).toBe(10);
  });
  it('Renders a Table without with the first row selected', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        records={records}
        selectedRow={0}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const selectedTr = tableNode.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
    expect(color(selectedTr.style.background).hexString())
      .toBe(color(BackgroundColors.selected).hexString());
  });
  // TODO check that a click event passes the expected data
  it('It does trigger a click event for a clicked table body element', () => {
    const mockHandleClick = jest.fn();
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        onClick={mockHandleClick}
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTd = tableNode.getElementsByTagName('tbody')[0].getElementsByTagName('td')[0];
    TestUtils.Simulate.click(firstTd);
    expect(mockHandleClick).toBeCalled();
  });
  it('It does render a hover effect for a table row element with onClick event', () => {
    const mockHandleClick = jest.fn();
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        onClick={mockHandleClick}
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTr = tableNode.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
    TestUtils.Simulate.mouseOver(firstTr);
    expect(tableComponent.state.hoveredRow).toBe(0);
    expect(tableComponent.state.isRowHovering).toBe(true);
    expect(color(firstTr.style.background).hexString())
      .toBe(color(BackgroundColors.hover).hexString());
  });
  it('It does not render a hover effect for a table row element without onClick event', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTr = tableNode.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
    TestUtils.Simulate.mouseOver(firstTr);
    expect(firstTr.style.background).toBe('');
  });
  it('It provides all records onClick when specified', () => {
    const mockHandleClick = jest.fn();
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        onClick={mockHandleClick}
        records={records}
        recordInclusion={['name', 'age']}
        returnAllRecordsOnClick={true}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTr = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0].getElementsByTagName('td')[0];
    TestUtils.Simulate.click(firstTr);
    expect(mockHandleClick).toBeCalledWith('name', 0, 'Sue', records[0], 0);
  });
  it('It provides only included records onClick', () => {
    const mockHandleClick = jest.fn();
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        onClick={mockHandleClick}
        records={records}
        recordInclusion={['name', 'age']}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTr = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0].getElementsByTagName('td')[0];
    TestUtils.Simulate.click(firstTr);
    expect(mockHandleClick).toBeCalledWith('name', 0, 'Sue', { name: 'Sue', age: 25 }, 0);
  });
  it('It renders a table with only filtered record types', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        headers={headers}
        records={records}
        filterRecords={[{ color: 'blue' }]}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTableRow = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0];
    const row1cell1 = firstTableRow.getElementsByTagName('td')[0];
    expect(row1cell1.textContent)
      .toBe('Sue');
    const row1cell2 = firstTableRow.getElementsByTagName('td')[1];
    expect(row1cell2.textContent)
      .toBe('25');
    const row1cell3 = firstTableRow.getElementsByTagName('td')[2];
    expect(row1cell3.textContent)
      .toBe('blue');
    const secondTableRow = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[1];
    const row2cell1 = secondTableRow.getElementsByTagName('td')[0];
    expect(row2cell1.textContent)
      .toBe('Peter');
    const row2cell2 = secondTableRow.getElementsByTagName('td')[1];
    expect(row2cell2.textContent)
      .toBe('28');
    const row2cell3 = secondTableRow.getElementsByTagName('td')[2];
    expect(row2cell3.textContent)
      .toBe('blue');
    const thirdTableRow = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[2];
    expect(thirdTableRow)
      .toBeUndefined();
  });
  it('It renders a zero state when all data is filtered out', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        headers={headers}
        records={records}
        recordInclusion={['name', 'age']}
        filterRecords={[{ age: 125 }]}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTableRow = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0];
    const row1cell1 = firstTableRow.getElementsByTagName('td')[0];
    expect(row1cell1.textContent)
      .toBe('No records found.');
  });
  it('It renders a table header when all data is filtered out', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        headers={headers}
        records={records}
        recordInclusion={['name', 'age']}
        filterRecords={[{ age: 125 }]}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const tHead = tableNode.getElementsByTagName('thead')[0];
    expect(tHead).toBeDefined();
    const firstTableHeaderElement = tHead.getElementsByTagName('th')[0];
    expect(firstTableHeaderElement.textContent)
      .toBe('Name');
  });
  it('It renders a table with column widths specified', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        columns={{
          width: ['60%', '10%', '30%'],
        }}
        headers={headers}
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTableRow = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0];
    const row1cell1 = firstTableRow.getElementsByTagName('td')[0];
    expect(row1cell1.style.width)
      .toBe('60%');
    const row1cell2 = firstTableRow.getElementsByTagName('td')[1];
    expect(row1cell2.style.width)
      .toBe('10%');
    const row1cell3 = firstTableRow.getElementsByTagName('td')[2];
    expect(row1cell3.style.width)
      .toBe('30%');
  });

  it('renders a table with columns in the order specified by records', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        columns={{ order: ['age', 'color', 'name'] }}
        headers={headers}
        records={recordsAltOrdered}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const firstTableRow = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0];
    const row1cell1 = firstTableRow.getElementsByTagName('td')[0];
    expect(row1cell1.textContent)
      .toBe('25');
    const row1cell2 = firstTableRow.getElementsByTagName('td')[1];
    expect(row1cell2.textContent)
      .toBe('blue');
    const row1cell3 = firstTableRow.getElementsByTagName('td')[2];
    expect(row1cell3.textContent)
      .toBe('Sue');
    const secondTableRow = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[1];
    const row2cell1 = secondTableRow.getElementsByTagName('td')[0];
    expect(row2cell1.textContent)
      .toBe('20');
    const row2cell2 = secondTableRow.getElementsByTagName('td')[1];
    expect(row2cell2.textContent)
      .toBe('green');
    const row2cell3 = secondTableRow.getElementsByTagName('td')[2];
    expect(row2cell3.textContent)
      .toBe('Frank');
    const thirdTableRow = tableNode.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[2];
    expect(thirdTableRow)
      .toBeUndefined();
  });

  it('renders a table header in the order specified', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        columns={{ order: ['color', 'age', 'name'] }}
        headers={headers}
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const tHead = tableNode.getElementsByTagName('thead')[0];
    expect(tHead).toBeDefined();
    const firstTableHeaderElement = tHead.getElementsByTagName('th')[0];
    expect(firstTableHeaderElement.textContent)
      .toBe('Favorite Color');
    const secondTableHeaderElement = tHead.getElementsByTagName('th')[1];
    expect(secondTableHeaderElement.textContent)
      .toBe('Age');
    const thirdTableHeaderElement = tHead.getElementsByTagName('th')[2];
    expect(thirdTableHeaderElement.textContent)
      .toBe('Name');
  });
});
