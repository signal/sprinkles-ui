/* eslint func-names: "off" */
/* eslint max-len: "off" */
/* eslint no-console: "off" */

import React from 'react';
import DataTable from '../../src/components/DataTable';


describe('DataTable', function () {
  this.headers = {
    name: 'Name',
    age: 'Age',
    color: 'Favorite Color',
  };
  this.records = [{
    name: 'Sue',
    age: 25,
    color: 'blue',
  },
  {
    name: 'Rachel',
    age: 23,
    color: 'blue',
  },
  {
    name: 'Frank',
    age: 20,
    color: 'green',
  },
  {
    name: 'Larry',
    age: 39,
    color: 'red',
  },
  {
    name: 'Jose',
    age: 19,
    color: 'purple',
  },
  ];

  this.recordInclusion = ['name', 'age'];
  this.filterRecords = [{ color: 'blue', age: 25 }];

  this.header(`
  ## DataTable
  `); // Markdown.

  const handleClick = (column, xCord, cellData, rowData, yCord) => {
    console.log({
      Column: column,
      xCord,
      'Cell Data': cellData,
      'Row Data': rowData,
      yCord,
    });
  };
  this.loadTable = (props) => {
    this.unload();
    this.component(
      <DataTable
        {...props}
      />,
    );
  };

  before(() => {
    this.unload();
  });

  it('Has no records', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: [],
      });
  });
  it('Change selected row', () => {
    const row = Math.floor(Math.random() * 3);
    this.loadTable(
      {
        headers: this.headers,
        multiSelectColumnName: 'name',
        records: this.records,
        recordInclusion: this.recordInclusion,
        selectedRows: [this.records[row].name],
      });
  });
  it('Select multiple rows', () => {
    this.loadTable(
      {
        headers: this.headers,
        multiSelectColumnName: 'name',
        records: this.records,
        recordInclusion: this.recordInclusion,
        selectedRows: [this.records[2].name, this.records[3].name],
      });
  });
  it('Exclude Age', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        recordInclusion: ['name', 'color'],
      });
  });
  it('Exclude Nothing', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        recordInclusion: null,
      });
  });
  it('Remove click handler', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
      });
  });
  it('Add click handler', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        onClick: handleClick,
      });
  });
  it('Filters records', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        filterRecords: this.filterRecords,
      });
  });
  it('Filters and excludes records', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        recordInclusion: ['name', 'color'],
        filterRecords: this.filterRecords,
      });
  });
  it('All records to filtered out', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        filterRecords: [{ bar: 'foo' }],
      });
  });
  it('All records to filtered out with multiselect', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        filterRecords: [{ bar: 'foo' }],
        multiSelectColumnName: 'name',
      });
  });
  it('Sets column width', () => {
    this.loadTable(
      {
        columns: {
          width: ['60%', '10%', '30%'],
        },
        headers: this.headers,
        records: this.records,
      });
  });
  it('Sorts columns in specified order', () => {
    this.loadTable(
      {
        columns: {
          order: ['name', 'color', 'age'],
        },
        headers: this.headers,
        records: this.records,
      });
  });

  it('Has multiselect turned on', () => {
    this.loadTable(
      {
        columns: {
          order: ['name', 'color', 'age'],
        },
        headers: this.headers,
        records: this.records,
        multiSelectColumnName: 'name',
        onChange: () => { console.log('Table changed'); },
      });
  });

  it('Use React node for content', () => {
    this.loadTable(
      {
        columns: {
          order: ['name', 'color', 'age'],
        },
        headers: this.headers,
        records: [{
          name: <a href={'http://ryanballa.com'}>Ryan Balla</a>,
          color: 'Blue',
          age: 100,
        }],
        multiSelectColumnName: 'name',
        onChange: () => { console.log('Table changed'); },
      });
  });

  it('Order by name', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        orderBy: {
          column: 'name',
          direction: 'desc',
        },
      });
  });

  it('Order by age', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        orderBy: {
          column: 'age',
          direction: 'asc',
        },
      });
  });

  it('Sorts records with custom getSortValue', () => {
    const getSortValue = value => (value.props ? value.props.children : value);
    this.loadTable(
      {
        columns: {
          order: ['name', 'color'],
        },
        headers: this.headers,
        records: [{
          name: 'Ryan Balla',
          color: 'Blue',
        },
        {
          name: <a href="http://signal.co">Signal Digital</a>,
          color: 'Red',
        }],
        orderBy: {
          column: 'name',
          direction: 'desc',
          getSortValue,
        },
      });
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### DataTable
  - **columns** *PropTypes.shape* (optional)
    - **order** *PropTypes.array* (optional) reorganizes the columns by key in this order
    - **width** *PropTypes.array* (optional) sets the width of individual columns the value specified here. If a column is obmitted 'auto' is used.
  - **headers** *PropTypes.object* (optional) maps to key of record. Use to provide custom header text otherwise the key is used
  - **records** *PropTypes.object* key/ value set of data used to populate the table
  - **multiSelectColumnName** *PropTypes.string* the value of this column should be a unique string, used to keep track of selected rows.
  - **recordInclusion** *PropTypes.object* (optional) maps to key of record, used to limit what is displayed
  - **onClick** *PropTypes.function* (optional) used to take action on clicking, supplies row index, row data and cell data. When defined, a hover effect is applied to the row.
  - **orderBy** *PropTypes.shape* (optional)
    - **column** *PropTypes.string* (optional) column of data to order by
    - **direction** *PropTypes.oneOf* (optional) 'asc' or 'desc'
    - **formatter** *PropTypes.oneOf* (optional) 'date' specify a way to format column data for sorting
    - **getSortValue** *PropTypes.func* (optional) a function that takes column data and returns a value to be used for sorting, needed for non-primitive data types, like React Components.
  - **selectedRows** *PropTypes.arrayOf(PropTypes.string)* an array of *multiSelectColumnName* values, used to identify rows.
  - **returnAllRecordsOnClick** *PropTypes.bool* (optional) returns all records for a row in the onClick argument regardless of record inclusion option
  - **filterRecords**  *PropTypes.object* key/ value set of data to filter the records against. If multiple values are supplied, it's considered an OR not an AND
  `);
});
