import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Base from './Base';

export default class ListDivider extends Base {

  static propTypes = {
    color: PropTypes.string,
    margin: PropTypes.number,
  }

  static defaultProps = {
    margin: 10,
  };

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        ListDivider: {
          background: clr.structuralColors.divider,
          height: 1,
          margin: `${this.props.margin} 0`,
          width: '100%',
        },
      },
    });

    return (<div style={style.ListDivider} />);
  }

}
