import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import styledComonent from '../shared/styledComponent';
import Base from './Base';

export default class TableRow extends Base {

  static PropTypes = {
    children: PropTypes.node,
    isHoverable: PropTypes.bool,
    isSelected: PropTypes.bool,
    isHeader: PropTypes.bool,
    style: stylePropType,
  }

  displayName = 'TableRow';

  render() {
    const clr = this.getColors();
    const style = {
      selected: {
        background: clr.backgroundColors.selected,
      },
      TableRowWithHover: {
        ':hover': {
          background: clr.backgroundColors.hover,
          cursor: 'Pointer',
        },
      },
      SortableTableHeader: {
        cursor: 'Pointer',
      },
    };

    const { isHeader, isHoverable, isSelected, style: styleFromProps } = this.props;

    let rowStyle = isHoverable ? style.TableRowWithHover : {};
    rowStyle = isSelected ? style.selected : rowStyle;
    rowStyle = isHeader ? style.SortableTableHeader : rowStyle;
    rowStyle = Object.assign({}, styleFromProps, rowStyle);

    const Row = styledComonent('tr', rowStyle);
    return (
      <Row>
        { this.props.children }
      </Row>
    );
  }

}
