import React from "react";
import ReactCSS from "reactcss";
import colors from "../shared/colors";

export default class Button extends ReactCSS.Component {
  displayName = "Button";

  static propTypes = {
    enabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
    working: React.PropTypes.bool,
  };

  static defaultProps = {
    enabled: true,
    working: false,
    text: "Submit"
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
      backgroundColor: colors.ButtonDisabledBackground,
      borderBottom: "1px solid" + colors.ButtonDisabledBorder
    }
    return {
      "default": {
        Button: {
          backgroundColor: colors.ButtonEnabledBackground,
          border: "none",
          borderBottom: "1px solid" + colors.ButtonEnabledBorder,
          borderRadius: "3px",
          color: "#fff",
          padding: "5px 25px"
        }
      },
      "hovering": {
        Button: {
          backgroundColor: colors.ButtonHoverBackground
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
