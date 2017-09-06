import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import DataTable from '../src/components/DataTable';

const headers = {
  name: 'Name',
  age: 'Age',
  color: 'Favorite Color',
};

const records = [
  { name: 'Sue',
    age: 25,
    color: 'blue',
    status: 'Active',
  },
  { name: 'Frank',
    age: 20,
    color: 'green',
    status: 'Inactive',
  },
  { name: 'Larry',
    age: 39,
    color: 'red',
    status: 'Active',
    href: '/larry',
  },
  { name: 'Jose',
    age: 20,
    color: 'purple',
    status: 'Inactive',
  },
  { name: 'Peter',
    age: 100,
    color: 'blue',
    status: 'Active',
  }];

const mixedNumericRecords = records.slice();
mixedNumericRecords.push(
  {
    name: '58 Demar',
    age: 38,
    color: 'blue',
    status: 'Active',
  },
  {
    name: '18 Zoe',
    age: 88,
    color: 'blue',
    status: 'Active',
  },
);

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
let rows;
let cell;

const mockHandleClick = jest.fn();
const getSortValue = value => (value.props ? value.props.children : value);
const renderTable = (props) => {
  tableComponent = ReactTestUtils.renderIntoDocument(
    <DataTable {...props} />,
  );
  tableNode = ReactDOM.findDOMNode(tableComponent);
  tHead = tableNode.getElementsByTagName('thead')[0];
  tBody = tableNode.getElementsByTagName('tbody')[0];
  rows = () => tBody.getElementsByTagName('tr');
  headerElement = (index) => tHead.getElementsByTagName('th')[index];
  row = (index) => rows()[index];
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
    expect(tRowCells).toBe(21);
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
      multiselectRowKey: 'name',
      records,
      selectedRows: [records[0].name],
    });
    expect(row(0).classList.contains('sui-selected')).toBe(true);
  });

  it('does render a hover effect for a table row element with onClick event', () => {
    renderTable({
      onClick: mockHandleClick,
      records,
    });
    ReactTestUtils.Simulate.mouseOver(row(0));
    expect(row(0).classList.contains('sui-hoverable')).toBe(true);
  });

  it('does not render a hover effect for a table row element without onClick event', () => {
    renderTable({
      onClick: null,
      records,
    });
    ReactTestUtils.Simulate.mouseOver(row(1));
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
    ReactTestUtils.Simulate.click(cell(0, 0));

    expect(mockHandleClick).toBeCalledWith(
      cell(0, 0),
      {
        cellData: 'Sue',
        columnKey: 'name',
        row: limitedData,
        xCord: 0,
        yCord: 0,
      },
    );
  });

  it('Provides href when clicking on a filtered segment row', () => {
    const limitedData = {
      age: 39,
      name: 'Larry',
      href: '/larry',
    };
    renderTable({
      onClick: mockHandleClick,
      records,
      recordInclusion: ['name', 'age', 'href'],
      filterRecords: [{ name: 'Larry' }],
    });
    ReactTestUtils.Simulate.click(cell(0, 0));

    expect(mockHandleClick).toBeCalledWith(
      cell(0, 0),
      {
        cellData: 'Larry',
        columnKey: 'name',
        row: limitedData,
        xCord: 0,
        yCord: 0,
      },
    );
  });

  it('provides all records onClick when specified', () => {
    renderTable({
      onClick: mockHandleClick,
      records,
      recordInclusion: ['name', 'age'],
      returnAllRecordsOnClick: true,
    });
    ReactTestUtils.Simulate.click(cell(0, 0));

    expect(mockHandleClick).toBeCalledWith(
      cell(0, 0),
      {
        cellData: 'Sue',
        columnKey: 'name',
        row: records[0],
        xCord: 0,
        yCord: 0,
      });
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
    expect(cell(1, 1).textContent).toBe('100');
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
      multiselectRowKey: 'name',
    });
    expect(cell(0, 0).getElementsByTagName('input').length).toBe(1);
  });

  it('returns a change event when multiselect is preformed', () => {
    const mockHandleChange = jest.fn();
    renderTable({
      headers,
      records,
      multiselectRowKey: 'name',
      onChange: mockHandleChange,
    });
    const checkBoxNode = tableComponent.checkBoxRefs[2].inputRef;
    const result = [records[2].name];
    ReactTestUtils.Simulate.click(checkBoxNode);
    expect(mockHandleChange).toBeCalledWith(result);
  });
  it('returns a change event when select all is triggered', () => {
    const mockHandleChange = jest.fn();
    renderTable({
      headers,
      records,
      multiselectRowKey: 'name',
      onChange: mockHandleChange,
    });
    const checkBoxNode = tableComponent.checkBoxHeaderRef.inputRef;
    ReactTestUtils.Simulate.click(checkBoxNode);
    expect(mockHandleChange).toBeCalledWith(records.map(record => record.name));
  });

  it('returns a change event when clicking anywhere within the select all checkbox th cell', () => {
    const mockHandleChange = jest.fn();
    renderTable({
      headers,
      records,
      multiselectRowKey: 'name',
      onChange: mockHandleChange,
    });
    const selectAllTHNode = headerElement(0);
    ReactTestUtils.Simulate.click(selectAllTHNode);
    expect(mockHandleChange).toBeCalledWith(records.map(record => record.name));
  });

  it('returns a change event when filtering segments and select all is triggered', () => {
    const mockHandleChange = jest.fn();
    renderTable({
      headers,
      records,
      multiselectRowKey: 'name',
      onChange: mockHandleChange,
      filterRecords: [{ status: 'Inactive' }],
    });
    const checkBoxNode = tableComponent.checkBoxHeaderRef.inputRef;
    ReactTestUtils.Simulate.click(checkBoxNode);
    expect(rows().length).toBe(2);
    expect(cell(0, 1).textContent).toBe('Frank');
    expect(cell(1, 1).textContent).toBe('Jose');
    expect(mockHandleChange).toBeCalledWith([records[1].name, records[3].name]);
  });

  it('selects a row when clicking anywhere within the checkbox cell', () => {
    const mockHandleChange = jest.fn();
    renderTable({
      records,
      returnAllRecordsOnClick: true,
      multiselectRowKey: 'age',
      onChange: mockHandleChange,
    });
    const result = [records[0].age];

    ReactTestUtils.Simulate.click(cell(0, 0));
    expect(mockHandleChange).toBeCalledWith(result);
  });

  it('generates colSpan for no results', () => {
    renderTable({
      headers,
      records,
      filterRecords: [{ age: 125 }],
    });
    expect(cell(0, 0).colSpan).toEqual('3');
  });

  it('generates colSpan for no results and multiselect', () => {
    renderTable({
      headers,
      records,
      filterRecords: [{ age: 125 }],
      multiselectRowKey: 'name',
    });
    expect(cell(0, 0).colSpan).toEqual('4');
  });
  /* Colspan cannot be 0, so it's important it's always at least 1 for the zerostate */
  it('generates colSpan for no records and no headers', () => {
    renderTable({
      headers: {},
      records: [],
    });
    expect(cell(0, 0).colSpan).toEqual('1');
  });

  it('Renders a React node as part of the records data', () => {
    const recordsWithNode = [
      { site: <a href={'http://google.com'}>Google</a>,
        type: 'Search Engine',
        hq: 'Mountain View',
      },
      {
        site: <a href={'http://excite.com'}>Excite</a>,
        type: <b>Search Engine</b>,
        hq: 'Dublin',
      },
    ];
    renderTable({
      records: recordsWithNode,
    });
    expect(rows().length).toBe(2);
    expect(cell(0, 0).getElementsByTagName('a').length).toBe(1);
  });

  it('Sorts mixed numeric records ascending', () => {
    renderTable({
      headers,
      records: mixedNumericRecords,
      orderBy: {
        column: 'name',
        direction: 'asc',
      },
    });
    expect(cell(0, 0).textContent).toBe('18 Zoe');
    expect(cell(1, 0).textContent).toBe('58 Demar');
    expect(cell(2, 0).textContent).toBe('Frank');
    expect(cell(3, 0).textContent).toBe('Jose');
    expect(cell(4, 0).textContent).toBe('Larry');
    expect(cell(5, 0).textContent).toBe('Peter');
    expect(cell(6, 0).textContent).toBe('Sue');
  });

  it('Sorts mixed numeric records descending', () => {
    renderTable({
      headers,
      records: mixedNumericRecords,
      orderBy: {
        column: 'name',
        direction: 'desc',
      },
    });
    expect(cell(0, 0).textContent).toBe('Sue');
    expect(cell(1, 0).textContent).toBe('Peter');
    expect(cell(2, 0).textContent).toBe('Larry');
    expect(cell(3, 0).textContent).toBe('Jose');
    expect(cell(4, 0).textContent).toBe('Frank');
    expect(cell(5, 0).textContent).toBe('58 Demar');
    expect(cell(6, 0).textContent).toBe('18 Zoe');
  });

  it('Sorts numeric records ascending', () => {
    renderTable({
      headers,
      records,
      orderBy: {
        column: 'age',
        direction: 'asc',
      },
    });
    expect(cell(0, 1).textContent).toBe('20');
    expect(cell(1, 1).textContent).toBe('20');
    expect(cell(2, 1).textContent).toBe('25');
    expect(cell(3, 1).textContent).toBe('39');
    expect(cell(4, 1).textContent).toBe('100');
  });

  it('Sorts numeric records descending', () => {
    renderTable({
      headers,
      records,
      orderBy: {
        column: 'age',
        direction: 'desc',
      },
    });
    expect(cell(0, 1).textContent).toBe('100');
    expect(cell(1, 1).textContent).toBe('39');
    expect(cell(2, 1).textContent).toBe('25');
    expect(cell(3, 1).textContent).toBe('20');
    expect(cell(4, 1).textContent).toBe('20');
  });

  it('Sorts date records ascending', () => {
    renderTable({
      headers,
      records: [
        { date: '2016/10/18 17:09' },
        { date: '2015/12/05 15:06' },
        { date: '2016/02/18 17:09' },
      ],
      orderBy: {
        column: 'date',
        direction: 'asc',
        formatter: 'date',
      },
    });
    expect(cell(0, 0).textContent).toBe('2015/12/05 15:06');
    expect(cell(1, 0).textContent).toBe('2016/02/18 17:09');
    expect(cell(2, 0).textContent).toBe('2016/10/18 17:09');
  });

  it('Sorts records with custom getSortValue ascending', () => {
    renderTable({
      headers,
      records: [
        { name: <a href="foo.com">Foo</a> },
        { name: 'Bar' },
      ],
      orderBy: {
        column: 'name',
        direction: 'asc',
        getSortValue,
      },
    });
    expect(cell(0, 0).textContent).toContain('Bar');
    expect(cell(1, 0).textContent).toContain('Foo');
  });

  it('Sorts records with non-primitive data types using getSortValue', () => {
    renderTable({
      headers,
      records: [
        { name: <a href="foo.com">Foo</a> },
        { name: <a href="bar.com">Bar</a> },
      ],
      orderBy: {
        column: 'name',
        direction: 'desc',
        getSortValue,
      },
    });
    expect(cell(0, 0).textContent).toContain('Foo');
    expect(cell(1, 0).textContent).toContain('Bar');
  });
});
