import React from "react";
import ReactCSS from "reactcss";
import Colors from "../shared/colors";
import Color from "color";

export default class Button extends ReactCSS.Component {
  displayName = "Button";

  static propTypes = {
    enabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      "default",
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
    type: "default"
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
      background: Colors.ButtonDisabledBackground,
      borderBottom: "1px solid" + Colors.ButtonDisabledBorder
    }
    return {
      "default": {
        Button: {
          background: Colors.ButtonEnabledBackground,
          border: "none",
          borderBottom: "1px solid" + Colors.ButtonEnabledBorder,
          borderRadius: "3px",
          color: "#fff",
          padding: "5px 25px"
        }
      },
      "hovering": {
        Button: {
          //Specify both to overrride global CSS
          background: Colors.ButtonHoverBackground,
        }
      },
      "danger": {
        Button: {
          background: Colors.danger,
          borderBottom: "1px solid " + Color(Colors.danger).darken(0.2).hexString()
        }
      },
      "warning": {
        Button: {
          background: Colors.warning,
          borderBottom: "1px solid " + Color(Colors.warning).darken(0.2).hexString()
        }
      },
      "success": {
        Button: {
          background: Colors.success,
          borderBottom: "1px solid " + Color(Colors.success).darken(0.2).hexString()
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
      "disabled": !this.props.enabled,
      "danger": this.props.type === "danger",
      "warning": this.props.type === "warning",
      "success": this.props.type === "success"
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
