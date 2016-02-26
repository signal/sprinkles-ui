import React from "react";
import ReactCSS from "reactcss";
import zindex from "../shared/zindex";

export default class Popover extends ReactCSS.Component {
  displayName = "Popover";

  static propTypes = {
    anchorEl: React.PropTypes.object,
    anchorOrigin: React.PropTypes.object,
    children: React.PropTypes.node,
    open: React.PropTypes.bool
  };

  static defaultProps = {
    open: false,
    anchorOrigin: {
      horizontal: "left",
      vertical: "bottom"
    }
  };

  constructor () {
    super();

    this.state = {
      position: {}
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
        Popover: this.state.position
      }
    }
  }

  calculatePosition (anchor, anchorOrigin) {
    return {
      top: this.getAnchorValue(anchor, anchorOrigin.vertical),
      left: this.getAnchorValue(anchor, anchorOrigin.horizontal)
    }
  }

  getAnchorValue (anchor, key) {
    switch (key) {
      case "top":
        return anchor.top;
      case "bottom":
        return anchor.bottom;
      case "left":
        return anchor.left;
      case "right":
        return anchor.right;
    }
  }

  styles () {
    return this.css({
      "open": this.props.open,
      "anchored": !!this.props.anchorEl
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.anchorEl && nextProps.anchorOrigin) {
      this.updatePosition(nextProps.anchorEl, nextProps.anchorOrigin);
    }
  }

  componentWillMount () {
    this.updatePosition(this.props.anchorEl, this.props.anchorOrigin);
  }

  updatePosition (anchorEl, anchorOrigin) {
    if (anchorEl) {
      const anchor = anchorEl.getBoundingClientRect();
      this.setState({
        position: this.calculatePosition(anchor, anchorOrigin)
      });
    }
  }

  render () {
    return (
        <div style={this.styles().Popover}>{this.props.children}</div>
    );
  }
};
