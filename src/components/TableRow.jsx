import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import Base from './Base';

export default class TableRow extends Base {

  static PropTypes = {
    children: PropTypes.node,
    isHoverable: PropTypes.bool,
    isSelected: PropTypes.bool,
    style: stylePropType,
  }

  displayName = 'TableRow';

  render() {
    const { isHoverable, isSelected, style } = this.props;
    const classNames = [];
    if (isHoverable) {
      classNames.push('sui-hoverable');
    }
    if (isSelected) {
      classNames.push('sui-selected');
    }
    const className = classNames.join(' ');
    return (
      <tr
        className={className}
        style={style}
      >
        { this.props.children }
      </tr>
    );
  }

}
