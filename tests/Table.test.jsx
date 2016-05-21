// don't mock our CUT or components it depends on
jest.dontMock('../src/components/Table');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// TODO: move this to es6 style import when its implemented in jest
const Table = require('../src/components/Table').default;
const data = {
  headers: ['Header 1', 'Header 2'],
  data: [
    ['Foo', 'Bar'],
    ['Bar', 'Baz'],
  ],
};

describe('Table', () => {
  it('Does render a Table', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table tableData={data} />
    );
    expect(tableComponent).toBeDefined();
  });
  it('Does render a Table with headers', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table tableData={data} />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    expect(tableNode.getElementsByTagName('thead')[0]).toBeDefined();
  });
  it('Does render a Table with a body', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table tableData={data} />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    expect(tableNode.getElementsByTagName('tbody')[0]).toBeDefined();
  });
  it('Does render a Table with cells', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table tableData={data} />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const tRowCells = tableNode.getElementsByTagName('tbody')[0].getElementsByTagName('td').length;
    expect(tRowCells).toBe(4);
  });
});
