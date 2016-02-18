import React from "react";
import ReactCSS from "reactcss";
import zindex from "../shared/zindex";

export default class Popover extends ReactCSS.Component {
  displayName = "Popover";

  static propTypes = {
    children: React.PropTypes.node,
    open: React.PropTypes.bool
  };

  static defaultProps = {
    open: false
  };

  classes () {
    return {
      "default": {
        Popover: {
          zindex: zindex.Popover,
          display: "none"
        }
      },
      "open": {
        Popover: {
          display: "block"
        }
      }
    }
  }

  styles () {
    return this.css({
      "open": this.props.open
    });
  }

  render () {
    return (
        <div style={this.styles().Popover}>{this.props.children}</div>
    );
  }
};
