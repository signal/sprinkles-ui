import React from "react";
import ReactCSS from "reactcss";
import { ButtonColors, TextColors } from "../shared/colors";
import Color from "color";

export default class Button extends ReactCSS.Component {
  displayName = "Button";

  static propTypes = {
    enabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      "secondary",
      "primary",
      "success",
      "info",
      "warning",
      "danger"
    ]),
    working: React.PropTypes.bool
  };

  static defaultProps = {
    enabled: true,
    working: false,
    text: "Submit",
    type: "secondary"
  };

  constructor() {
    super();
    this.state = {
      isHovering: false
    }
  }

  handleMouseOut () {
    this.setState({isHovering: false});
  }

  handleMouseOver () {
    this.setState({isHovering: true});
  }

  classes () {
    var disabledStyles = {
      background: ButtonColors.ButtonDisabledBackground,
      borderBottom: "1px solid" + ButtonColors.ButtonDisabledBorder
    }
    const borderButtonColor = Color(ButtonColors[this.props.type])
        .darken(0.3).hexString();
    const hoverButtonColor =  Color(ButtonColors[this.props.type])
        .darken(0.1).hexString();
    const disabledButtonColor =  Color(ButtonColors[this.props.type])
        .lighten(0.3).hexString();
    return {
      "default": {
        Button: {
          background: ButtonColors.secondary,
          border: "1px solid " + borderButtonColor,
          borderRadius: "3px",
          color: TextColors.dark,
          padding: "5px 25px"
        }
      },
      "typeColor": {
        Button: {
          background: ButtonColors[this.props.type],
          border: "1px solid transparent",
          borderBottom: "1px solid " + borderButtonColor,
          color: TextColors.light
        }
      },
      "hovering": {
        Button: {
          background: hoverButtonColor,
        }
      },
      "disabled": {
        Button: {
          background: this.props.type === "secondary" ? hoverButtonColor : disabledButtonColor,
          cursor: "not-allowed"
        }
      },
      "working": {
        Button: {
          background: this.props.type === "secondary" ? hoverButtonColor : disabledButtonColor,
          cursor: "wait"
        }
        //TODO: add some kind of working indicator here
      }
    }
  }

  styles () {
    return this.css({
      "typeColor": this.props.type !== "secondary",
      "hovering": this.state.isHovering,
      "disabled": !this.props.enabled,
      "working": this.props.working
    })
  }

  render () {
    return (
        <button
            disabled={this.props.working || !this.props.enabled}
            onClick={this.props.onClick}
            onMouseOut={this.handleMouseOut.bind(this)}
            onMouseOver={this.handleMouseOver.bind(this)}
            style={this.styles().Button}
        >
            {this.props.working ? this.props.text + " (working)" : this.props.text}
        </button>
    );
  }
};
