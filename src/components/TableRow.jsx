import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import Base from './Base';

export default class TableRow extends Base {

  static propTypes = {
    children: PropTypes.node,
    isHoverable: PropTypes.bool,
    isSelected: PropTypes.bool,
    style: stylePropType,
    rowKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  displayName = 'TableRow';

  shouldComponentUpdate(nextProps) {
    // If rowKey is specified we can be smarter about re-drawing
    return this.props.rowKey === undefined ||
      this.props.rowKey !== nextProps.rowKey ||
      nextProps.isSelected !== this.props.isSelected;
  }

  render() {
    const { isHoverable, isSelected, style } = this.props;
    const hoverableClass = isHoverable ? 'sui-hoverable' : '';
    const selectedClass = isSelected ? 'sui-selected' : '';
    return (
      <tr
        className={`${hoverableClass} ${selectedClass}`}
        style={style}
      >
        { this.props.children }
      </tr>
    );
  }

}
