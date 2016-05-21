import React from 'react';
import ReactCSS from 'reactcss';
import {
  BackgroundColors,
  StructuralColors,
  TextColors,
} from '../shared/colors';

export default class Table extends ReactCSS.Component {
  displayName = 'Table';

  static propTypes = {
    tableData: React.PropTypes.object.isRequired,
  }

  renderHeaderItem() {
    return this.props.tableData.headers.map((item, i) => (
      <th style={this.styles().TheadItems} key={i}>
        { item }
      </th>
      )
    );
  }

  renderHeaderItems() {
    return (<tr style={this.styles().Thead}>
      { this.renderHeaderItem() }
    </tr>
    );
  }

  renderItems(item, i) {
    return (
      <td style={this.styles().TBodyItems} key={i}>
      { item }
      </td>
    );
  }

  renderRow(row, i) {
    return (
      <tr key={i}>
        { row.map((item, ri) => this.renderItems(item, ri)) }
      </tr>
    );
  }

  renderRows() {
    return this.props.tableData.data.map((item, i) => this.renderRow(item, i));
  }

  classes() {
    return {
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
    };
  }

  render() {
    return (
      <table style={this.styles().Table}>
        <thead>
          { this.renderHeaderItems() }
        </thead>
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>
    );
  }

}
