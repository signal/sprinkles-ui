import React from 'react';
import PropTypes from 'prop-types';

export default class VectorGraphic extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    height: PropTypes.number,
    width: PropTypes.number,
  };

  static defaultProps = {
    height: 10,
    width: 10,
  };

  displayName = 'VectorGraphic';

  render() {
    return (
      <svg
        height={this.props.height}
        version={'1.1'}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        width={this.props.width}
        xmlns={'http://www.w3.org/2000/svg'}
      >
        {this.props.children}
      </svg>
    );
  }
}
