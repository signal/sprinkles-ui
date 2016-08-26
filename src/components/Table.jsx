import React from 'react';
import reactCSS from 'reactcss';
import {
  BackgroundColors,
  StructuralColors,
  TextColors,
} from '../shared/colors';

export default class Table extends React.Component {

  static propTypes = {
    columns: React.PropTypes.shape({
      order: React.PropTypes.array,
      width: React.PropTypes.array,
    }),
    headers: React.PropTypes.object,
    filterRecords: React.PropTypes.array,
    records: React.PropTypes.array.isRequired,
    recordInclusion: React.PropTypes.array,
    noRecordsText: React.PropTypes.string,
    onClick: React.PropTypes.func,
    returnAllRecordsOnClick: React.PropTypes.bool,
    selectedRow: React.PropTypes.number,
  }

  static defaultProps = {
    noRecordsText: 'No records found.',
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
    this.setState(
      { isRowHovering: false,
        hoveredRow: null,
      }
    );
  }

  handleMouseOver(rowIndex) {
    this.setState(
      { isRowHovering: true,
        hoveredRow: rowIndex,
      }
    );
  }

  includeSubRecords(record, propObject) {
    const filteredRecord = {};
    Object.getOwnPropertyNames(record).forEach((val) => {
      if (propObject.indexOf(val) > -1) {
        filteredRecord[val] = record[val];
      }
    });
    return filteredRecord;
  }

  filteredSubRecords(record, propObject) {
    let filteredRecord = {};
    Object.getOwnPropertyNames(record).forEach((val) => {
      propObject.forEach((filterVal) => {
        if (filterVal[val] === record[val]) {
          filteredRecord = record;
        }
      });
    });
    return filteredRecord;
  }

  processRecords() {
    let processedRecords = this.props.records;
    if (this.props.recordInclusion) {
      processedRecords = processedRecords.map((record) =>
        this.includeSubRecords(record, this.props.recordInclusion));
    }
    if (this.props.filterRecords) {
      processedRecords = processedRecords.map((record) =>
        this.filteredSubRecords(record, this.props.filterRecords));
    }
    return processedRecords;
  }

  handleClick(itemData, xCord, cellData, rowData, yCord) {
    const returnedRowData = this.props.returnAllRecordsOnClick ?
      this.props.records[yCord] : rowData;
    //  FIXME: We should pass an object instead of individual arguments
    this.props.onClick(itemData, xCord, cellData, returnedRowData, yCord);
  }

  renderHeaderItem(style, records) {
    const firstRecord = records[0];
    return Object.keys(firstRecord).map((item, i) => (
      <th style={style.TheadItems} key={i}>
        {this.props.headers ? this.props.headers[item] : item}
      </th>
      )
    );
  }

  renderHeaderItems(style, records, sourceRecords) {
    const headerRecords = Object.keys(records[0]).length > 0 ? records : sourceRecords;
    return (<tr style={style.Thead}>
      {this.renderHeaderItem(style, headerRecords)}
    </tr>
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
    const isSelectedRow = i === this.props.selectedRow ? style.selected : null;
    const isHoveredRow = i === this.state.hoveredRow ? style.TableRow : isSelectedRow;
    const rowItem = Object.keys(row).map((item, ri) => this.renderItems(style, item, ri, row, i));
    return rowItem.length > 0 ? (
      <tr
        key={i}
        onMouseOut={this.handleMouseOut.bind(this, i)}
        onMouseOver={this.handleMouseOver.bind(this, i)}
        style={isHoveredRow}
      >
      { rowItem }
      </tr>
    ) : null;
  }

  renderNoResults(style) {
    return (
      <tr>
        <td
          colSpan={Object.keys(this.props.records[0]).length}
          style={style.TBodyItems}
        >
          {this.props.noRecordsText}
        </td>
      </tr>
    );
  }

  renderRows(style, records) {
    const rowResults = records.length ?
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
      hover: this.props.onClick ? this.state.isRowHovering : null,
    });

    return (
      <table style={style.Table}>
        <thead>
          {this.renderHeaderItems(style, records, sourceRecords)}
        </thead>
        <tbody>
          {this.renderRows(style, records)}
        </tbody>
      </table>
    );
  }

}
