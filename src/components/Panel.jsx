import React from 'react';
import reactCSS from 'reactcss';
import Base from './Base';

export default class Panel extends Base {
  static propTypes = {
    backgroundColor: React.PropTypes.string,
    borderColor: React.PropTypes.string,
    borderSize: React.PropTypes.number,
    borderRadius: React.PropTypes.number,
    boxShadowStrength: React.PropTypes.number,
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    height: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    margin: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    padding: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    text: React.PropTypes.string,
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  };

  static defaultProps = {
    borderSize: 1,
    margin: 0,
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

  constructBoxShadow() {
    const bi = this.props.boxShadowStrength - 1;
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
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        Panel: {
          backgroundColor: this.props.backgroundColor || clr.backgroundColors.primary,
          color: this.props.color || clr.textColors.primary,
          padding: this.props.padding,
          margin: this.props.margin,
          boxSizing: 'border-box',
        },
      },
      border: {
        Panel: {
          border: `${this.props.borderSize}px solid ${this.props.borderColor}`,
        },
      },
      roundedCorners: {
        Panel: {
          borderRadius: `${this.props.borderRadius}px`,
        },
      },
      dropShadow: {
        Panel: {
          boxShadow: `${this.constructBoxShadow()}`,
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
      border: !!this.props.borderColor,
      dropShadow: !!this.props.boxShadowStrength,
      roundedCorners: !!this.props.borderRadius,
      height: !!this.props.height,
      width: !!this.props.width,
    });
    return (
      <div style={style.Panel}>{this.renderChildren()}</div>
    );
  }

}
