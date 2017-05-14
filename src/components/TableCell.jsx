/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Base from './Base';

export default class TableCell extends Base {

  static propTypes = {
    colSpan: PropTypes.number,
    children: PropTypes.node,
    onClick: PropTypes.func,
    width: PropTypes.string,
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
