import React from "react";
import ReactCSS from "reactcss";

export default class ListItem extends ReactCSS.Component {
  displayName = "ListItem";

  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func
  };

  constructor() {
    super();

    this.state = {
      isHovering: false
    };
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
        div: {
          padding: 10
        }
      },
      "hovering": {
        div: {
          background: "#4285F4",
          color: "#F5F5F5"
        }
      }
    };
  }

  styles () {
    return this.css({
      "hovering": this.state.isHovering
    });
  }

  render () {
    return (
        <div
            onClick={this.props.onClick}
            onMouseOut={this.handleMouseOut.bind(this)}
            onMouseOver={this.handleMouseOver.bind(this)}
            style={this.styles().div}
        >
          {this.props.children}
        </div>
    );
  }
}
