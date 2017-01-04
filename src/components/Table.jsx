/* eslint jsx-a11y/no-static-element-interactions: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint class-methods-use-this: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import Base from './Base';
import Checkbox from './Checkbox';

export default class Table extends Base {

  static propTypes = {
    columns: React.PropTypes.shape({
      order: React.PropTypes.array,
      width: React.PropTypes.array,
    }),
    filterRecords: React.PropTypes.array,
    headers: React.PropTypes.object,
    multiSelectable: React.PropTypes.bool,
    noRecordsText: React.PropTypes.string,
    orderBy: React.PropTypes.shape({
      column: React.PropTypes.string,
      direction: React.PropTypes.oneOf(['asc', 'desc']),
      /* Strings and numbers are supported by default and do not need explicit format config.
        Use date for any dates, must be pure date (Yes: 10/20/1994 No: Updated: 10/20/1994)
      */
      formatter: React.PropTypes.oneOf(['date']),
    }),
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    records: React.PropTypes.array,
    recordInclusion: React.PropTypes.array,
    returnAllRecordsOnClick: React.PropTypes.bool,
    selectedRows: React.PropTypes.arrayOf(React.PropTypes.number),
  }

  static defaultProps = {
    noRecordsText: 'No records found.',
    multiSelectable: false,
    onClick: () => {},
    onChange: () => {},
    records: [],
    selectedRows: [],
  };

  displayName = 'Table';

  constructor() {
    super();
    this.state = {
      hoveredRow: null,
      isRowHovering: false,
    };
  }

  handleMouseOut() {
    if (this.props.onClick) {
      this.setState(
        { isRowHovering: false,
          hoveredRow: null,
        }
      );
    }
  }

  handleMouseOver(rowIndex) {
    if (this.props.onClick) {
      this.setState(
        { isRowHovering: true,
          hoveredRow: rowIndex,
        }
      );
    }
  }

  includeSubRecords(record) {
    const filteredRecord = {};
    Object.getOwnPropertyNames(record).forEach((val) => {
      if (this.props.recordInclusion.indexOf(val) > -1) {
        filteredRecord[val] = record[val];
      }
    });
    return filteredRecord;
  }

  filteredSubRecords(record) {
    let result = false;
    Object.getOwnPropertyNames(record).forEach((val) => {
      this.props.filterRecords.forEach((filterVal) => {
        if (filterVal[val] === record[val]) {
          result = true;
        }
      });
    });
    return result;
  }

  sortRecords(record) {
    const newRecord = {};
    this.props.columns.order.forEach((val) => {
      newRecord[val] = record[val];
    });
    return newRecord;
  }

  processHeaders() {
    let headers = this.props.headers;
    if (!headers) {
      const firstRowCopy = Object.assign({}, this.props.records[0]);

      Object.keys(firstRowCopy).forEach((key) => {
        firstRowCopy[key] = key;
      });

      headers = firstRowCopy;
    }

    if (this.props.columns && this.props.columns.order) {
      return this.sortRecords(headers);
    }

    if (this.props.recordInclusion) {
      const filteredHeaders = {};
      this.props.recordInclusion.forEach((record) => {
        filteredHeaders[record] = headers[record];
      });

      return filteredHeaders;
    }

    return headers;
  }

  sortColumnRecords(mappedRecords) {
    const ops = {
      asc: (a, b) =>
         +(a > b) || +(a === b) - 1,
      desc: (a, b) =>
         +(a < b) || +(a === b) - 1,
    };

    return mappedRecords.sort((a, b) => {
      switch (this.props.orderBy.formatter) {
        case 'date':
          return ops[this.props.orderBy.direction](new Date(a.value), new Date(b.value));
        default:
          return ops[this.props.orderBy.direction](a.value, b.value);
      }
    });
  }

  processRecords() {
    let processedRecords = this.props.records;
    if (this.props.recordInclusion) {
      processedRecords = processedRecords.map((record) =>
        this.includeSubRecords(record));
    }
    if (this.props.filterRecords) {
      processedRecords = processedRecords.filter((record) =>
        this.filteredSubRecords(record));
    }
    if (this.props.columns && this.props.columns.order) {
      processedRecords = processedRecords.map((record) =>
        this.sortRecords(record));
    }
    if (this.props.orderBy) {
      const mappedColValues = processedRecords.map((record, i) => (
        { index: i, value: record[this.props.orderBy.column] }
      ));
      const sortedColumnValues = this.sortColumnRecords(mappedColValues);
      const orderdRecords = sortedColumnValues.map((el) =>
        processedRecords[el.index]
      );
      processedRecords = orderdRecords;
    }
    return processedRecords;
  }

  handleClick(itemData, xCord, cellData, rowData, yCord) {
    const returnedRowData = this.props.returnAllRecordsOnClick ?
      this.props.records[yCord] : rowData;
    // FIXME: We should pass an object instead of individual arguments
    this.props.onClick(itemData, xCord, cellData, returnedRowData, yCord);
  }

  handleSelectAll() {
    this.props.onChange(this.processRecords());
  }

  handleRowSelect(row, yCord) {
    const rows = [];
    rows[yCord] = row;
    this.props.onChange(rows);
  }

  renderHeaderItem(style) {
    const headers = this.processHeaders();
    const headerTitles = Object.keys(headers).map((header, i) => (
      <th
        key={i}
        style={style.TheadItems}
      >
        {headers[header]}
      </th>
      )
    );
    const selectAllHeader = (
      <th
        key={0}
        onClick={this.handleSelectAll.bind(this)}
        style={style.TheadItems}
      >
        <Checkbox
          ref={c => this.checkBoxHeaderRef = c}
          checked={false}
        />
      </th>
    );
    return this.props.multiSelectable ? [selectAllHeader, headerTitles] : headerTitles;
  }

  renderHeaderItems(style) {
    return (<tr style={style.Thead}>
      {this.renderHeaderItem(style)}
    </tr>
    );
  }

  renderCheckBox(tdStyle, xCord, row, yCord) {
    this.checkBoxRefs = [];
    const shouldBeChecked = this.props.selectedRows.indexOf(yCord) > -1;
    return (
      <td
        key={xCord}
        style={tdStyle}
        onClick={this.handleRowSelect.bind(this, row, yCord)}
      >
        <Checkbox
          checked={shouldBeChecked}
          ref={(c) => this.checkBoxRefs.push(c)}
        />
      </td>
    );
  }

  renderItems(style, columnKey, xCord, row, yCord) {
    const cellData = row[columnKey];
    const cellWidth = (this.props.columns && this.props.columns.width)
      ? this.props.columns.width[xCord] : 'auto';
    const tdStyle = Object.assign({}, style.TBodyItems, { width: cellWidth });
    return (
      <td
        key={xCord}
        onClick={this.handleClick.bind(this, columnKey, xCord, cellData, row, yCord)}
        style={tdStyle}
      >
        {cellData}
      </td>
    );
  }

  renderRow(style, row, i) {
    const rowSelected = this.props.selectedRows.indexOf(i) > -1;
    const isSelectedRow = rowSelected ? style.selected : undefined;
    const rowStyle = (i === this.state.hoveredRow ? style.TableRow : isSelectedRow);
    const rowItem = Object.keys(row).map((item, ri) => this.renderItems(style, item, ri, row, i));
    const multiSelectItem = this.renderCheckBox(style.TBodyItems, 0, row, i);

    return rowItem.length > 0 ? (
      <tr
        key={i}
        onMouseOut={this.handleMouseOut.bind(this, i)}
        onMouseOver={this.handleMouseOver.bind(this, i)}
        style={rowStyle}
      >
        { this.props.multiSelectable ? multiSelectItem : undefined }
        { rowItem }
      </tr>
    ) : null;
  }

  renderNoResults(style) {
    let colSpan = Object.keys(this.processHeaders()).length;
    /* We need to add an element to account for the checkbox column for multiselect */
    if (this.props.multiSelectable) {
      colSpan += 1;
    }

    return (
      <tr>
        <td
          colSpan={colSpan > 0 ? colSpan : 1}
          style={style.TBodyItems}
        >
          {this.props.noRecordsText}
        </td>
      </tr>
    );
  }

  renderRows(style, records) {
    const rowResults = records.length > 0 ?
      records.map((item, i) => this.renderRow(style, item, i)) : [];
    return rowResults[0] ? rowResults : this.renderNoResults(style);
  }

  render() {
    const clr = this.getColors();
    const records = this.processRecords();
    const style = reactCSS({
      default: {
        selected: {
          background: clr.backgroundColors.selected,
        },
        Table: {
          border: 'none',
          color: clr.textColors.primary,
        },
        Thead: {
          background: clr.backgroundColors.tableHeader,
          borderBottom: `1px solid ${clr.structuralColors.divider}`,
        },
        TheadItems: {
          background: clr.backgroundColors.tableHeader,
          border: 'none',
          color: clr.textColors.tableHeader,
          padding: '20px',
          fontWeight: 'bold',
          textAlign: 'left',
        },
        TBodyItems: {
          // reset any greedy styles
          border: 'none',
          borderBottom: `1px solid ${clr.structuralColors.divider}`,
          color: clr.textColors.primary,
          padding: '20px',
        },
      },
      hover: {
        TableRow: {
          background: clr.backgroundColors.hover,
          cursor: 'Pointer',
        },
      },
    }, {
      hover: this.state.isRowHovering,
    });

    return (
      <table style={style.Table}>
        <thead>
          {this.renderHeaderItems(style)}
        </thead>
        <tbody>
          {this.renderRows(style, records)}
        </tbody>
      </table>
    );
  }

}
