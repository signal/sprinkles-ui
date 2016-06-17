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

  handleClick(itemData, i, cellData) {
    this.props.onClick(itemData, i, cellData);
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

  renderItems(style, columnKey, i, row) {
    const cellData = row[columnKey];
    return (
      <td
        onClick={this.handleClick.bind(this, columnKey, i, cellData)}
        style={style.TBodyItems} key={i}
      >
        {cellData}
      </td>
    );
  }

  renderRow(style, row, i) {
    return (
      <tr
        key={i}
        style={i === this.props.selectedRow ? style.selected : null}
      >
      {
        Object.keys(row).map((item, ri) => this.renderItems(style, item, ri, row))
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
