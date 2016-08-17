import React from 'react';
import reactCSS from 'reactcss';
import {
  BackgroundColors,
  StructuralColors,
  TextColors,
} from '../shared/colors';

export default class Table extends React.Component {

  static propTypes = {
    headers: React.PropTypes.object,
    records: React.PropTypes.array.isRequired,
    recordInclusion: React.PropTypes.array,
    onClick: React.PropTypes.func,
    selectedRow: React.PropTypes.number,
  }

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

  filteredSubRecords(record) {
    const self = this;
    const filteredRecord = {};
    Object.getOwnPropertyNames(record).forEach((val) => {
      if (self.props.recordInclusion.indexOf(val) > -1) {
        filteredRecord[val] = record[val];
      }
    });
    return filteredRecord;
  }

  filteredRecords() {
    return this.props.records.map((record) => this.filteredSubRecords(record));
  }

  handleClick(itemData, i, cellData, rowData) {
    this.props.onClick(itemData, i, cellData, rowData);
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

  renderHeaderItems(style, records) {
    return (<tr style={style.Thead}>
      {this.renderHeaderItem(style, records)}
    </tr>
    );
  }

  renderItems(style, columnKey, xCord, row, yCord) {
    const cellData = row[columnKey];
    return (
      <td
        onClick={this.handleClick.bind(this, columnKey, xCord, cellData, row, yCord)}
        style={style.TBodyItems} key={xCord}
      >
        {cellData}
      </td>
    );
  }

  renderRow(style, row, i) {
    const isSelectedRow = i === this.props.selectedRow ? style.selected : null;
    const isHoveredRow = i === this.state.hoveredRow ? style.TableRow : isSelectedRow;
    return (
      <tr
        key={i}
        onMouseOut={this.handleMouseOut.bind(this, i)}
        onMouseOver={this.handleMouseOver.bind(this, i)}
        style={isHoveredRow}
      >
      {
        Object.keys(row).map((item, ri) => this.renderItems(style, item, ri, row, i))
      }
      </tr>
    );
  }

  renderRows(style, records) {
    return records.map((item, i) => this.renderRow(style, item, i));
  }

  render() {
    const recordProp = this.props.records;
    const records = this.props.recordInclusion ? this.filteredRecords(recordProp) : recordProp;
    const style = reactCSS({
      default: {
        selected: {
          background: BackgroundColors.selected,
        },
        Table: {
          border: 'none',
        },
        Thead: {
          background: BackgroundColors.table,
          borderBottom: `1px solid ${StructuralColors.divider}`,
        },
        TheadItems: {
          color: TextColors.tableHead,
          padding: '20px',
          fontWeight: 'bold',
          textAlign: 'left',
        },
        TBodyItems: {
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
          {this.renderHeaderItems(style, records)}
        </thead>
        <tbody>
          {this.renderRows(style, records)}
        </tbody>
      </table>
    );
  }

}
