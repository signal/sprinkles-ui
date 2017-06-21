/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
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
    return (
      <td
        colSpan={this.props.colSpan}
        onClick={this.props.onClick}
        style={{ width: this.props.width }}
      >
        {this.props.children}
      </td>
    );
  }
}
