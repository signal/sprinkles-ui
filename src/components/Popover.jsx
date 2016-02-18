import React from "react";
import ReactCSS from "reactcss";

export default class Popover extends ReactCSS.Component {
  displayName = "Popover";

  static propTypes = {
    children: React.PropTypes.node,
  };

  classes () {
    return {
      "default": {
        Popover: {

        }
      }
    }
  }

  render () {
    return (
        <div style={this.styles().Popover}>{this.props.children}</div>
    );
  }
};
