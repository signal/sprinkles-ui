/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import Base from './Base';

export default class TableCell extends Base {

  static propTypes = {
    colSpan: PropTypes.number,
    children: PropTypes.node,
    level: PropTypes.number,
    onClick: PropTypes.func,
    width: PropTypes.string,
  }

  static defaultProps = {
    width: 'auto',
  };

  displayName = 'TableCell';

  render() {
    const style = { width: this.props.width };
    let levelClass = '';

    if (this.props.level) {
      style.paddingLeft = `${(20 * this.props.level)}px`;
      levelClass = `row-level-${this.props.level}`;
    }
    return (
      <td  // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
        className={`row ${levelClass}`}
        colSpan={this.props.colSpan}
        onClick={this.props.onClick}
        style={style}
      >
        {this.props.children}
      </td>
    );
  }
}
