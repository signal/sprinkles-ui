/* eslint func-names: "off" */
/* eslint max-len: "off" */

import React from 'react';
import Table from '../../src/components/Table';


describe('Table', function () {
  this.tableData = {
    headers: ['Header 1', 'Header 2'],
    data: [
      ['Foo', 'Bar'],
      ['Bar', 'Baz'],
    ],
  };

  this.header(`
  ## Table
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <Table
        tableData={
          this.tableData
        }
      />
    );
  });

  it('Adds More Rows', () => this.props({ tableData: {
    headers: ['Header 1', 'Header 2'],
    data: [
      ['Foo', 'Bar'],
      ['Bar', 'Baz'],
      ['Bar', 'Baz'],
      ['Bar', 'Baz'],
      ['Bar', 'Baz'],
    ],
  },
  }
));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Table

  Coming Soon

  `);
});
