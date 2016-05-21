import React from 'react';
import ReactCSS from 'reactcss';

export default class VectorGraphic extends ReactCSS.Component {
  displayName = 'VectorGraphic';

  static propTypes = {
    children: React.PropTypes.node,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
  };

  static defaultProps = {
    height: 10,
    width: 10,
  };

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
