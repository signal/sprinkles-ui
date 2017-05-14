import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import Base from './Base';

export default class TableRow extends Base {

  static PropTypes = {
    children: PropTypes.node,
    isHoverable: PropTypes.bool,
    isSelected: PropTypes.bool,
    rowIndex: PropTypes.number.isRequired,
    style: stylePropType,
  }

  displayName = 'TableRow';

  constructor() {
    super();
    this.state = {
      hoveredRowIndex: null,
      isUserCurrentlyHovering: false,
    };
  }

  handleMouseOut() {
    if (this.props.isHoverable) {
      this.setState(
        { isUserCurrentlyHovering: false,
          hoveredRowIndex: null,
        },
      );
    }
  }

  handleMouseOver(rowIndex) {
    if (this.props.isHoverable) {
      this.setState(
        { isUserCurrentlyHovering: true,
          hoveredRowIndex: rowIndex,
        },
      );
    }
  }

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        selected: {
          background: clr.backgroundColors.selected,
        },
      },
      hover: {
        TableRow: {
          background: clr.backgroundColors.hover,
          cursor: 'Pointer',
        },
      },
    }, {
      hover: this.state.isUserCurrentlyHovering,
    });
    const rowStyle = this.props.isSelected ? style.selected : style.TableRow;
    return (
      <tr
        onMouseOut={this.handleMouseOut.bind(this, this.props.rowIndex)}
        onMouseOver={this.handleMouseOver.bind(this, this.props.rowIndex)}
        style={this.props.style || rowStyle}
      >
        { this.props.children }
      </tr>
    );
  }

}
