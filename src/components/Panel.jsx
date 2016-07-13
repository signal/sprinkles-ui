import { BackgroundColors, TextColors } from '../shared/colors';
import React from 'react';
import reactCSS from 'reactcss';

export default class Panel extends React.Component {
  static propTypes = {
    backgroundColor: React.PropTypes.string,
    borderRadius: React.PropTypes.number,
    boxShadowStrength: React.PropTypes.number,
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    height: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    padding: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    text: React.PropTypes.string,
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  };

  static defaultProps = {
    backgroundColor: BackgroundColors.primary,
    color: TextColors.primary,
    padding: 10,
  };

  static displayName = 'Panel';

  static bs = {
    RGBA1: [0.12, 0.16, 0.19, 0.25, 0.3],
    OffsetY1: [1, 3, 10, 14, 19],
    Blur1: [6, 10, 30, 45, 60],
    RGBA2: [0.12, 0.23, 0.23, 0.22, 0.22],
    OffsetY2: [1, 3, 6, 10, 15],
    Blur2: [4, 10, 10, 18, 20],
  };

  constructBoxShadow(bi) {
    const BS1 = `${Panel.bs.OffsetY1[bi]}px
    ${Panel.bs.Blur1[bi]}px
    rgba(0, 0, 0, ${Panel.bs.RGBA1[bi]})`;

    const BS2 = `${Panel.bs.OffsetY2[bi]}px
    ${Panel.bs.Blur2[bi]}px rgba(0, 0, 0,
    ${Panel.bs.RGBA2[bi]})`;

    return `0 ${BS1}, 0 ${BS2}`;
  }

  renderChildren() {
    return (this.props.children) ? this.props.children : this.props.text;
  }

  render() {
    const style = reactCSS({
      default: {
        Panel: {
          backgroundColor: this.props.backgroundColor,
          color: this.props.color,
          padding: this.props.padding,
          boxSizing: 'border-box',
        },
      },
      roundedCorners: {
        Panel: {
          borderRadius: `${this.props.borderRadius}px`,
        },
      },
      dropShadow: {
        Panel: {
          boxShadow: `${this.constructBoxShadow(this.props.boxShadowStrength - 1)}`,
        },
      },
      height: {
        Panel: {
          height: this.props.height,
        },
      },
      width: {
        Panel: {
          width: this.props.width,
        },
      },
    }, {
      roundedCorners: !!this.props.borderRadius,
      dropShadow: !!this.props.boxShadowStrength,
      height: !!this.props.height,
      width: !!this.props.width,
    });
    return (
      <div style={style.Panel}>{this.renderChildren()}</div>
    );
  }

}
