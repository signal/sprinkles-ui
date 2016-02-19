import React from "react";
import ReactCSS from "reactcss";
import zindex from "../shared/zindex";

export default class Popover extends ReactCSS.Component {
  displayName = "Popover";

  static propTypes = {
    anchorEl: React.PropTypes.object,
    children: React.PropTypes.node,
    open: React.PropTypes.bool
  };

  static defaultProps = {
    open: false
  };

  constructor () {
    super();

    this.state = {
      top: undefined,
      left: undefined
    };
  }

  classes () {
    return {
      "default": {
        Popover: {
          zindex: zindex.Popover,
          display: "none",
          position: "fixed"
        }
      },
      "open": {
        Popover: {
          display: "block"
        }
      },
      "anchored": {
        Popover: {
          top: this.state.top,
          left: this.state.left
        }
      }
    }
  }

  styles () {
    return this.css({
      "open": this.props.open,
      "anchored": !!this.props.anchorEl
    });
  }

  componentWillReceiveProps (nextProps) {
    this.updatePosition(nextProps.anchorEl);
  }

  componentWillMount () {
    this.updatePosition(this.props.anchorEl);
  }

  updatePosition (anchorEl) {
    if (anchorEl) {
      const anchor = anchorEl.getBoundingClientRect();
      this.setState({
        top: anchor.bottom,
        left: anchor.left
      });
    }
  }

  render () {
    return (
        <div style={this.styles().Popover}>{this.props.children}</div>
    );
  }
};
