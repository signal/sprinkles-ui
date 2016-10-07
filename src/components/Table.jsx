/* eslint jsx-a11y/no-static-element-interactions: "off" */
/* eslint react/forbid-prop-types: "off" */
/* eslint class-methods-use-this: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import {
  BackgroundColors,
  StructuralColors,
  TextColors,
} from '../shared/colors';
import Checkbox from './Checkbox';

export default class Table extends React.Component {

  static propTypes = {
    columns: React.PropTypes.shape({
      order: React.PropTypes.array,
      width: React.PropTypes.array,
    }),
    filterRecords: React.PropTypes.array,
    headers: React.PropTypes.object,
    multiSelectable: React.PropTypes.bool,
    noRecordsText: React.PropTypes.string,
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
    return processedRecords;
  }

  handleClick(itemData, xCord, cellData, rowData, yCord) {
    const returnedRowData = this.props.returnAllRecordsOnClick ?
      this.props.records[yCord] : rowData;
    // FIXME: We should pass an object instead of individual arguments
    this.props.onClick(itemData, xCord, cellData, returnedRowData, yCord);
  }

  handleSelectAll() {
    const allRows = [...Array(this.props.records.length).keys()];
    this.props.onChange(allRows);
  }

  handleRowSelect(columnKey, xCord, cellData, row, yCord) {
    this.props.onChange({
      columnKey,
      xCord,
      cellData,
      row,
      yCord,
    });
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
        style={style.TheadItems}
      >
        <Checkbox
          ref={c => this.checkBoxHeaderRef = c}
          onChange={this.handleSelectAll.bind(this)}
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

  renderCheckBox(tdStyle, columnKey, xCord, cellData, row, yCord) {
    this.checkBoxRefs = [];
    const shouldBeChecked = this.props.selectedRows.indexOf(yCord) > -1;
    return (
      <td
        key={xCord}
        style={tdStyle}
        onClick={this.handleRowSelect.bind(this, columnKey, xCord, cellData, row, yCord)}
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
    const multiSelectItem = this.renderCheckBox(style.TBodyItems, '', 0, '', row, i);

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
    let colSpan = '';
    if (this.props.headers) {
      colSpan = this.props.headers;
    } else if (this.props.records[0]) {
      colSpan = this.props.records[0];
    }

    return (
      <tr>
        <td
          colSpan={Object.keys(colSpan).length}
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
    const sourceRecords = this.props.records;
    const records = this.processRecords(sourceRecords);
    const style = reactCSS({
      default: {
        selected: {
          background: BackgroundColors.selected,
        },
        Table: {
          border: 'none',
          color: TextColors.primary,
        },
        Thead: {
          background: BackgroundColors.tableHeader,
          borderBottom: `1px solid ${StructuralColors.divider}`,
        },
        TheadItems: {
          background: BackgroundColors.tableHeader,
          border: 'none',
          color: TextColors.tableHeader,
          padding: '20px',
          fontWeight: 'bold',
          textAlign: 'left',
        },
        TBodyItems: {
          // reset any greedy styles
          border: 'none',
          borderBottom: `1px solid ${StructuralColors.divider}`,
          color: TextColors.primary,
          padding: '20px',
        },
      },
      hover: {
        TableRow: {
          background: BackgroundColors.hover,
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
