import color from 'color';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { BackgroundColors } from '../src/shared/colors';
import Table from '../src/components/Table';

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
  age: 20,
  color: 'purple',
},
{ name: 'Peter',
  age: 28,
  color: 'blue',
}];

const defaultProps = {
  headers,
  records,
};

let tableNode;
let tHead;
let tBody;
let tableComponent;
let headerElement;
let row;
let cell;

const mockHandleClick = jest.fn();
const renderTable = (props) => {
  tableComponent = TestUtils.renderIntoDocument(
    <Table
      columns={props.columns}
      headers={props.headers}
      onClick={props.onClick}
      onChange={props.onChange}
      filterRecords={props.filterRecords}
      multiSelectable={props.multiSelectable}
      records={props.records}
      recordInclusion={props.recordInclusion}
      returnAllRecordsOnClick={props.returnAllRecordsOnClick}
      selectedRows={props.selectedRows}
    />
  );
  tableNode = ReactDOM.findDOMNode(tableComponent);
  tHead = tableNode.getElementsByTagName('thead')[0];
  tBody = tableNode.getElementsByTagName('tbody')[0];
  headerElement = (index) => tHead.getElementsByTagName('th')[index];
  row = (index) => tBody.getElementsByTagName('tr')[index];
  cell = (x, y) => row(x).getElementsByTagName('td')[y];
};

describe('Table', () => {
  beforeEach(() => {
    renderTable(defaultProps);
  });

  it('Does render a Table', () => {
    expect(tableComponent).toBeDefined();
  });

  it('renders a Table with no records', () => {
    renderTable({
      headers,
      records: [],
    });

    expect(cell(0, 0).textContent).toBe('No records found.');
  });

  it('renders a Table with no records and no headers', () => {
    renderTable({
      headers: undefined,
      records: [],
    });

    expect(cell(0, 0).textContent).toBe('No records found.');
  });

  it('renders a Table with headers', () => {
    expect(tHead).toBeDefined();
    expect(headerElement(0).textContent).toBe('Name');
    expect(headerElement(1).textContent).toBe('Age');
    expect(headerElement(2).textContent).toBe('Favorite Color');
  });

  it('renders a Table with headers, excluding headers in recordInclusion', () => {
    renderTable({
      headers,
      records,
      recordInclusion: ['name', 'age'],
    });

    expect(tHead).toBeDefined();
    expect(headerElement(0).textContent).toBe('Name');
    expect(headerElement(1).textContent).toBe('Age');
    expect(headerElement(2)).toBeUndefined();
  });

  it('Renders a Table without headers specified', () => {
    renderTable({
      records,
    });

    expect(tHead).toBeDefined();
    expect(headerElement(0).textContent).toBe('name');
    expect(headerElement(1).textContent).toBe('age');
    expect(headerElement(2).textContent).toBe('color');
  });

  it('Does render a Table with a body', () => {
    expect(tBody).toBeDefined();
  });

  it('Does render a Table with cells', () => {
    const tRowCells = tBody.getElementsByTagName('td').length;
    expect(tRowCells).toBe(15);
  });

  it('Renders a Table with limited data selected', () => {
    renderTable({
      headers,
      records,
      recordInclusion: ['name', 'age'],
    });
    const tRowCells = tBody.getElementsByTagName('td').length;

    expect(tRowCells).toBe(10);
  });

  it('Renders a Table with the first row selected', () => {
    renderTable({
      records,
      selectedRows: [0],
    });
    expect(color(row(0).style.background).hexString())
      .toBe(color(BackgroundColors.selected).hexString());
  });

  it('does render a hover effect for a table row element with onClick event', () => {
    renderTable({
      onClick: mockHandleClick,
      records,
    });
    TestUtils.Simulate.mouseOver(row(0));

    expect(tableComponent.state.hoveredRow).toBe(0);
    expect(tableComponent.state.isRowHovering).toBe(true);
    expect(color(row(0).style.background).hexString())
      .toBe(color(BackgroundColors.hover).hexString());
  });

  it('does not render a hover effect for a table row element without onClick event', () => {
    renderTable({
      onClick: null,
      records,
    });
    TestUtils.Simulate.mouseOver(row(1));

    expect(row(1).style.background).toBe('');
  });

  it('Provides only included records for a clicked table body element', () => {
    const limitedData = {
      age: 25,
      name: 'Sue',
    };
    renderTable({
      onClick: mockHandleClick,
      records,
      recordInclusion: ['name', 'age'],
    });
    TestUtils.Simulate.click(cell(0, 0));

    expect(mockHandleClick).toBeCalledWith('name', 0, 'Sue', limitedData, 0);
  });

  it('provides all records onClick when specified', () => {
    renderTable({
      onClick: mockHandleClick,
      records,
      recordInclusion: ['name', 'age'],
      returnAllRecordsOnClick: true,
    });
    TestUtils.Simulate.click(cell(0, 0));

    expect(mockHandleClick).toBeCalledWith('name', 0, 'Sue', records[0], 0);
  });

  it('renders a table with one filtered record type', () => {
    renderTable({
      headers,
      records,
      filterRecords: [{ color: 'blue' }],
    });

    expect(cell(0, 0).textContent).toBe('Sue');
    expect(cell(0, 1).textContent).toBe('25');
    expect(cell(0, 2).textContent).toBe('blue');
    expect(cell(1, 0).textContent).toBe('Peter');
    expect(cell(1, 1).textContent).toBe('28');
    expect(cell(1, 2).textContent).toBe('blue');
    expect(row(2)).toBeUndefined();
  });

  it('renders a table with multiple filtered record types', () => {
    renderTable({
      headers,
      records,
      filterRecords: [{ age: 20, color: 'green' }],
    });

    expect(cell(0, 0).textContent).toBe('Frank');
    expect(cell(0, 1).textContent).toBe('20');
    expect(cell(0, 2).textContent).toBe('green');
    expect(cell(1, 0).textContent).toBe('Jose');
    expect(cell(1, 1).textContent).toBe('20');
    expect(cell(1, 2).textContent).toBe('purple');
  });

  it('maintains the order when there are no records found', () => {
    renderTable({
      columns: { order: ['age', 'color', 'name'] },
      headers,
      records,
      filterRecords: [{ age: 125 }],
    });
    expect(cell(0, 0).textContent).toBe('No records found.');
    expect(headerElement(0).textContent).toBe('Age');
    expect(headerElement(1).textContent).toBe('Favorite Color');
    expect(headerElement(2).textContent).toBe('Name');
  });

  it('renders a zero state when no data meets filters', () => {
    renderTable({
      headers,
      records,
      filterRecords: [{ age: 125 }],
    });
    expect(cell(0, 0).textContent).toBe('No records found.');
  });

  it('renders a table header when all data is filtered out', () => {
    renderTable({
      headers,
      records,
      filterRecords: [{ age: 125 }],
    });

    expect(tHead).toBeDefined();
    expect(headerElement(0).textContent).toBe('Name');
  });
  it('renders a table with column widths specified', () => {
    renderTable({
      headers,
      records,
      columns: { width: ['60%', '10%', '30%'] },
    });

    expect(cell(0, 0).style.width).toBe('60%');
    expect(cell(0, 1).style.width).toBe('10%');
    expect(cell(0, 2).style.width).toBe('30%');
  });

  it('renders a table with columns in the order specified by records', () => {
    renderTable({
      headers,
      records,
      columns: { order: ['age', 'color', 'name'] },
    });

    expect(cell(0, 0).textContent).toBe('25');
    expect(cell(0, 1).textContent).toBe('blue');
    expect(cell(0, 2).textContent).toBe('Sue');
    expect(cell(1, 0).textContent).toBe('20');
    expect(cell(1, 1).textContent).toBe('green');
    expect(cell(1, 2).textContent).toBe('Frank');
  });

  it('renders a table header in the order specified', () => {
    renderTable({
      headers,
      records,
      columns: { order: ['color', 'age', 'name'] },
    });

    expect(headerElement(0).textContent).toBe('Favorite Color');
    expect(headerElement(1).textContent).toBe('Age');
    expect(headerElement(2).textContent).toBe('Name');
  });

  it('renders a table with checkboxes when multiselect is enabled', () => {
    renderTable({
      headers,
      records,
      multiSelectable: true,
    });
    expect(cell(0, 0).getElementsByTagName('input').length).toBe(1);
  });

  it('returns a change event when multiselect is preformed', () => {
    const mockHandleChange = jest.fn();
    renderTable({
      headers,
      records,
      multiSelectable: true,
      onChange: mockHandleChange,
    });
    const selectedRows = { selectedRows: [2] };
    const checkBoxNode = tableComponent.checkBoxRefs[2].inputRef;
    TestUtils.Simulate.change(checkBoxNode, { selectedRows });
    expect(mockHandleChange).toBeCalledWith({
      cellData: '',
      columnKey: '',
      row: records[2],
      xCord: 0,
      yCord: 2,
    });
  });
  it('returns a change event when select all is triggered', () => {
    const mockHandleChange = jest.fn();
    renderTable({
      headers,
      records,
      multiSelectable: true,
      onChange: mockHandleChange,
    });
    const checkBoxNode = tableComponent.checkBoxHeaderRef.inputRef;
    TestUtils.Simulate.change(checkBoxNode);
    expect(mockHandleChange).toBeCalledWith([0, 1, 2, 3, 4]);
  });
});
