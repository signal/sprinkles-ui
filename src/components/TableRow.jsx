import React from 'react';
import reactCSS from 'reactcss';
import stylePropType from 'react-style-proptype';
import Base from './Base';

export default class TableRow extends Base {

  static propTypes = {
    children: React.PropTypes.node,
    isHoverable: React.PropTypes.bool,
    isSelected: React.PropTypes.bool,
    rowIndex: React.PropTypes.number.isRequired,
    style: stylePropType,
  }

  displayName = 'TableRow';

  constructor() {
    super();
    this.state = {
      hoveredRow: null,
      isRowHovering: false,
    };
  }

  handleMouseOut() {
    if (this.props.isHoverable) {
      this.setState(
        { isRowHovering: false,
          hoveredRow: null,
        }
      );
    }
  }

  handleMouseOver(rowIndex) {
    if (this.props.isHoverable) {
      this.setState(
        { isRowHovering: true,
          hoveredRow: rowIndex,
        }
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
      hover: this.state.isRowHovering,
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
