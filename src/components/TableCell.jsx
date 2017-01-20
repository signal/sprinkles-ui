/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import Base from './Base';

export default class TableCell extends Base {

  static propTypes = {
    colSpan: React.PropTypes.number,
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    width: React.PropTypes.string,
  }

  static defaultProps = {
    width: 'auto',
  };

  displayName = 'TableCell';

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        TBodyItems: {
          // reset any greedy styles
          border: 'none',
          borderBottom: `1px solid ${clr.structuralColors.divider}`,
          color: clr.textColors.primary,
          padding: '20px',
        },
      },
    });

    const tdStyle = Object.assign({}, style.TBodyItems, { width: this.props.width });
    return (
      <td
        colSpan={this.props.colSpan}
        onClick={this.props.onClick}
        style={tdStyle}
      >
        {this.props.children}
      </td>
    );
  }
}
