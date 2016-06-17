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

  before(() => {
    const handleClick = (column, i, cellData) => {
      console.log({
        Column: column,
        Index: i,
        'Cell Data': cellData,
      });
      console.log(`Cell: ${cellData}`);
      this.props({
        selectedRow: i,
      });
    };
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <Table
        headers={this.headers}
        onClick={handleClick.bind(this)}
        records={
          this.records
        }
        recordInclusion={this.recordInclusion}
        selectedRow={2}
      />
    );
  });

  it('Change selected row', () => {
    const row = Math.floor(Math.random() * 4);
    this.props({ selectedRow: row });
  });
  it('Exclude Age', () => {
    this.props({ recordInclusion: ['name', 'color'] });
  });
  it('Exclude Nothing', () => {
    this.props({ recordInclusion: null });
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Table

  - **headers** *React.PropTypes.object* (optional) maps to key of record. Use to provide custom header text otherwise the key is used
  - **records** *React.PropTypes.object* key/ value set of data used to populate the table
  - **recordInclusion** *React.PropTypes.object* (optional) maps to key of record, used to limit what is displayed
  - **onClick** *React.PropTypes.function* (optional) used to take action on clicking, supplies row index, row data and cell data
  - **selectedRow** *React.PropTypes.number* (optional) highlight a single row based on index

  `);
});
