import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import Base from './Base';

export default class TableRow extends Base {

  static propTypes = {
    children: PropTypes.node,
    isCollapsed: PropTypes.bool,
    isHoverable: PropTypes.bool,
    isSelected: PropTypes.bool,
    style: stylePropType,
    rowKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    isCollapsed: false,
  };
  displayName = 'TableRow';

  shouldComponentUpdate(nextProps) {
    // If rowKey is specified we can be smarter about re-drawing
    return !this.props.rowKey ||
      this.props.rowKey !== nextProps.rowKey ||
      nextProps.isSelected !== this.props.isSelected;
  }

  render() {
    const { isCollapsed, isHoverable, isSelected, style } = this.props;
    const classNames = [];
    if (isCollapsed) {
      classNames.push('collapsed');
    }
    if (isHoverable) {
      classNames.push('sui-hoverable');
    }
    if (isSelected) {
      classNames.push('sui-selected');
    }
    const className = classNames.join(' ');
    return (
      <tr
        className={`${className}`}
        style={style}
      >
        { this.props.children }
      </tr>
    );
  }

}
