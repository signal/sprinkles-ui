import React from "react";
import ReactCSS from "reactcss";
import { ButtonColors } from "../shared/colors";
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
    return {
      "default": {
        Button: {
          background: ButtonColors[this.props.type],
          border: "none",
          borderBottom: "1px solid " + Color(ButtonColors[this.props.type]).darken(0.2).hexString(),
          borderRadius: "3px",
          color: this.props.type === "secondary" ? "#222222" : "#FEFEFE",
          padding: "5px 25px"
        }
      },
      "hovering": {
        Button: {
          //Specify both to overrride global CSS
          background: ButtonColors.ButtonHoverBackground,
        }
      },
      "disabled": {
        Button: disabledStyles
      },
      "working": {
        Button: disabledStyles
        //TODO: add some kind of working indicator here
      }
    }
  }

  styles () {
    return this.css({
      "hovering": this.state.isHovering,
      "working": this.props.working,
      "disabled": !this.props.enabled
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
