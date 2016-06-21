import React from 'react';
import reactCSS from 'reactcss';
import {
  BackgroundColors,
  StructuralColors,
  TextColors,
} from '../shared/colors';

export default class Table extends React.Component {
  static propTypes = {
    tableData: React.PropTypes.object.isRequired,
  }

  displayName = 'Table';

  renderHeaderItem(style) {
    return this.props.tableData.headers.map((item, i) => (
      <th style={style.TheadItems} key={i}>
        {item}
      </th>
      )
    );
  }

  renderHeaderItems(style) {
    return (<tr style={style.Thead}>
      {this.renderHeaderItem(style)}
    </tr>
    );
  }

  renderItems(style, item, i) {
    return (
      <td style={style.TBodyItems} key={i}>
      {item}
      </td>
    );
  }

  renderRow(style, row, i) {
    return (
      <tr key={i}>
        {row.map((item, ri) => this.renderItems(style, item, ri))}
      </tr>
    );
  }

  renderRows(style) {
    return this.props.tableData.data.map((item, i) => this.renderRow(style, item, i));
  }

  render() {
    const style = reactCSS({
      default: {
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
          {this.renderHeaderItems(style)}
        </thead>
        <tbody>
          {this.renderRows(style)}
        </tbody>
      </table>
    );
  }

}
