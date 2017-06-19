/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import styledComonent from '../shared/styledComponent';
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
    const style = {
      TBodyItems: {
        // reset any greedy styles
        border: 'none',
        borderBottom: `1px solid ${clr.structuralColors.divider}`,
        color: clr.textColors.primary,
        padding: '20px',
      },
    };

    const tdStyle = Object.assign({}, style.TBodyItems, { width: this.props.width });
    const StyledTD = styledComonent('td', tdStyle);
    return (
      <StyledTD
        colSpan={this.props.colSpan}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </StyledTD>
    );
  }
}
