import { BackgroundColors, TextColors } from "../shared/colors";
import React from "react";
import ReactCSS from "reactcss";

export default class Panel extends ReactCSS.Component {
  static displayName = "Panel";

  static propTypes = {
    backgroundColor: React.PropTypes.string,
    borderRadius: React.PropTypes.number,
    boxShadowStrength: React.PropTypes.number,
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    padding: React.PropTypes.string,
    text: React.PropTypes.string,
  };

  static defaultProps = {
    backgroundColor: BackgroundColors.primary,
    color: TextColors.primary,
    padding: "10px",
  };

  static bs = {
    RGBA1: [0.12, 0.16, 0.19, 0.25, 0.3],
    OffsetY1: [1, 3, 10, 14, 19],
    Blur1: [6, 10, 30, 45, 60],
    RGBA2: [0.12, 0.23, 0.23, 0.22, 0.22],
    OffsetY2: [1, 3, 6, 10, 15],
    Blur2: [4, 10, 10, 18, 20],
  };

  styles() {
    return this.css({
      roundedCorners: !!this.props.borderRadius,
      dropShadow: !!this.props.boxShadowStrength,
    });
  }

  constructBoxShadow(bi) {
    const BS1 = `${Panel.bs.OffsetY1[bi]}px
    ${Panel.bs.Blur1[bi]}px
    rgba(0, 0, 0, ${Panel.bs.RGBA1[bi]})`;

    const BS2 = `${Panel.bs.OffsetY2[bi]}px
    ${Panel.bs.Blur2[bi]}px rgba(0, 0, 0,
    ${Panel.bs.RGBA2[bi]})`;

    return `0 ${BS1}, 0 ${BS2}`;
  }

  classes() {
    return {
      default: {
        Panel: {
          backgroundColor: this.props.backgroundColor,
          color: this.props.color,
          padding: this.props.padding,
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
    };
  }

  renderChildren() {
    return (this.props.children) ? this.props.children : this.props.text;
  }

  render() {
    return (
      <div style={this.styles().Panel}>{this.renderChildren()}</div>
    );
  }

}
