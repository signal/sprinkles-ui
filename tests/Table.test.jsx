import color from 'color';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { BackgroundColors } from '../src/shared/colors';

// don't mock our CUT or components it depends on
jest.dontMock('../src/components/Table');

// TODO: move this to es6 style import when its implemented in jest
const Table = require('../src/components/Table').default;

const headers = {
  name: 'Name',
  age: 'Age',
  color: 'Favorite Color',
};
const records = [{
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
    expect(tableNode.getElementsByTagName('thead')[0]).toBeDefined();
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
    expect(tRowCells).toBe(12);
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
    expect(tRowCells).toBe(8);
  });
  it('Renders a Table without headers specified', () => {
    const tableComponent = TestUtils.renderIntoDocument(
      <Table
        records={records}
      />
    );
    const tableNode = ReactDOM.findDOMNode(tableComponent);
    const tRowCells = tableNode.getElementsByTagName('tbody')[0].getElementsByTagName('td').length;
    expect(tableNode.getElementsByTagName('thead')[0]).toBeDefined();
    expect(tRowCells).toBe(12);
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
});
