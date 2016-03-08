import React from "react";
import ReactCSS from "reactcss";

export default class Button extends ReactCSS.Component {
  displayName = "Button";

  static propTypes = {
    isWorking: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string
  };

  static defaultProps = {
    isWorking: false,
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
    return {
      "default": {
        Button: {
          backgroundColor: "#00ADEF",
          border: "none",
          borderBottom: "1px solid #00688f",
          borderRadius: "3px",
          color: "#fff",
          padding: "5px 25px"
        }
      },
      "hovering": {
        Button: {
          backgroundColor: "#05B2F4"
        }
      },
      "working": {
        Button: {
          backgroundColor: "grey"

        }
      }
    }
  }

  styles () {
    return this.css({
      "hovering": this.state.isHovering,
      "working": this.props.isWorking
    })
  }

  render () {
    return (
        <button
            disabled={this.props.isWorking}
            onMouseOut={this.handleMouseOut.bind(this)}
            onMouseOver={this.handleMouseOver.bind(this)}
            style={this.styles().Button}
        >{this.props.text}
        </button>
    );
  }
};
