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
	{ name: 'Frank',
    age: 20,
    color: 'green',
  },
	{ name: 'Larry',
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
    this.load(
      <Table
        headers={props.headers}
        onClick={props.onClick ? handleClick : null}
        records={
          props.records
        }
        recordInclusion={props.recordInclusion}
        selectedRow={props.selectedRow}
      />
    );
  };

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.loadTable({
      headers: this.headers,
      records: this.records,
      recordInclusion: this.recordInclusion,
    });
  });

  it('Change selected row', () => {
    const row = Math.floor(Math.random() * 3);
    this.loadTable(
      {
        headers: this.headers,
        records: this.records,
        recordInclusion: this.recordInclusion,
        selectedRow: row,
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

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Table

  - **headers** *React.PropTypes.object* (optional) maps to key of record. Use to provide custom header text otherwise the key is used
  - **records** *React.PropTypes.object* key/ value set of data used to populate the table
  - **recordInclusion** *React.PropTypes.object* (optional) maps to key of record, used to limit what is displayed
  - **onClick** *React.PropTypes.function* (optional) used to take action on clicking, supplies row index, row data and cell data. When defined, a hover effect is applied to the row.
  - **selectedRow** *React.PropTypes.number* (optional) highlight a single row based on index

  `);
});
