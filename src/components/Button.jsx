import React from "react";
import ReactCSS from "reactcss";
import { ButtonColors, TextColors } from "../shared/colors";
import color from "color";

export default class Button extends ReactCSS.Component {
  displayName = "Button";

  static propTypes = {
    children: React.PropTypes.node,
    enabled: React.PropTypes.bool,
    groupPosition: React.PropTypes.oneOf(["left", "center", "right"]),
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      "secondary",
      "primary",
      "success",
      "info",
      "warning",
      "danger",
    ]),
    working: React.PropTypes.bool,
  };

  static defaultProps = {
    enabled: true,
    working: false,
    text: "Submit",
    type: "secondary",
  };

  constructor() {
    super();
    this.state = {
      isHovering: false,
    };
  }

  handleMouseOut() {
    this.setState({ isHovering: false });
  }

  handleMouseOver() {
    this.setState({ isHovering: true });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.working !== nextProps.working && nextProps.working) {
      this.setState({ isHovering: false });
    }
  }

  componentWillMount() {
    this.keyframe = document.createElement("style");
    this.keyframe.innerHTML = `@keyframes button-working {
      from { background-position: 0 0; }
      to { background-position: 14px 0px; }
    }`;
    document.head.appendChild(this.keyframe);
  }

  componentWillUnmount() {
    document.head.removeChild(this.keyframe);
  }

  classes() {
    const veryDarkened = color(ButtonColors[this.props.type])
        .darken(0.3).hexString();
    const darkened = color(ButtonColors[this.props.type])
        .darken(0.1).hexString();
    const lightened = color(ButtonColors[this.props.type])
        .lighten(0.3).hexString();
    const workingColor = this.props.type === "secondary" ? darkened : veryDarkened;
    return {
      default: {
        Button: {
          background: ButtonColors.secondary,
          border: `1px solid ${veryDarkened}`,
          borderRadius: "3px",
          color: TextColors.dark,
          padding: "5px 15px",
          outline: "none",
        },
      },
      typeColor: {
        Button: {
          background: ButtonColors[this.props.type],
          border: "1px solid transparent",
          borderBottom: `1px solid ${veryDarkened}`,
          color: TextColors.light,
        },
      },
      hovering: {
        Button: {
          background: darkened,
          cursor: "pointer",
        },
      },
      disabled: {
        Button: {
          background: this.props.type === "secondary" ? darkened : lightened,
          cursor: "not-allowed",
        },
      },
      working: {
        Button: {
          cursor: "wait",
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 7px,
            ${workingColor} 7px,
            ${workingColor} 14px
          )`,
          animation: "button-working 0.5s linear infinite",
          backgroundSize: "14px auto",
        },
      },
      groupPositionLeft: {
        Button: {
          borderRadius: "3px 0 0 3px",
        },
      },
      groupPositionCenter: {
        Button: {
          borderRadius: "0",
        },
      },
      groupPositionRight: {
        Button: {
          borderRadius: "0 3px 3px 0",
        },
      },
    };
  }

  styles() {
    return this.css({
      typeColor: this.props.type !== "secondary",
      hovering: this.state.isHovering && !this.props.working,
      disabled: !this.props.enabled,
      working: this.props.working,
      groupPositionLeft: this.props.groupPosition === "left",
      groupPositionCenter: this.props.groupPosition === "center",
      groupPositionRight: this.props.groupPosition === "right",
    });
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
    return this.props.text;
  }

  render() {
    return (
      <button
        disabled={this.props.working || !this.props.enabled}
        onClick={this.props.onClick}
        onMouseOut={this.handleMouseOut.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        style={this.styles().Button}
      >
        {this.renderChildren()}
      </button>
    );
  }
}
