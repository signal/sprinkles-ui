/* eslint func-names: "off" */
/* eslint max-len: "off" */
/* eslint no-console: "off" */

import React from 'react';
import Table from '../../src/components/Table';


describe('Table', function () {
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
  ## Table
  `); // Markdown.

  this.loadTable = (props) => {
    const handleClick = (column, xCord, cellData, rowData, yCord) => {
      console.log({
        Column: column,
        xCord,
        'Cell Data': cellData,
        'Row Data': rowData,
        yCord,
      });
    };
    this.unload();
    this.component(
      <Table
        columns={props.columns}
        headers={props.headers}
        filterRecords={props.filterRecords}
        onClick={handleClick}
        records={
          props.records
        }
        recordInclusion={props.recordInclusion}
        selectedRows={props.selectedRows}
        multiSelectable={props.multiSelectable}
        onChange={props.onChange}
      />
    );
  };

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.loadTable({
      headers: this.headers,
      records: this.records,
      recordInclusion: this.recordInclusion,
      filterRecords: this.filterRecords,
    });
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
        records: this.records,
        recordInclusion: this.recordInclusion,
        selectedRows: [row],
      });
  });
  it('Select multiple rows', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        recordInclusion: this.recordInclusion,
        selectedRows: [2, 3],
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
        onClick: null,
      });
  });
  it('Add click handler', () => {
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        onClick: true,
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
        multiSelectable: true,
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
        multiSelectable: true,
        onChange: () => { console.log('Table changed'); },
      });
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Table
  - **columns** *React.PropTypes.shape* (optional)
    - **order** *React.PropTypes.array* (optional) reorganizes the columns by key in this order
    - **width** *React.PropTypes.array* (optional) sets the width of individual columns the value specified here. If a column is obmitted 'auto' is used.
  - **headers** *React.PropTypes.object* (optional) maps to key of record. Use to provide custom header text otherwise the key is used
  - **records** *React.PropTypes.object* key/ value set of data used to populate the table
  - **recordInclusion** *React.PropTypes.object* (optional) maps to key of record, used to limit what is displayed
  - **onClick** *React.PropTypes.function* (optional) used to take action on clicking, supplies row index, row data and cell data. When defined, a hover effect is applied to the row.
  - **selectedRows** *React.PropTypes.arrayOf(React.PropTypes.number)* select rows based on index
  - **returnAllRecordsOnClick** *React.PropTypes.bool* (optional) returns all records for a row in the onClick argument regardless of record inclusion option
  - **filterRecords**  *React.PropTypes.object* key/ value set of data to filter the records against. If multiple values are supplied, it's considered an OR not an AND
  `);
});
