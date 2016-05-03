import React from "react";
import ReactCSS from "reactcss";
import zindex from "../shared/zindex";

export default class Popover extends ReactCSS.Component {
  displayName = "Popover";

  static propTypes = {
    anchorEl: React.PropTypes.object,
    anchorOrigin: React.PropTypes.shape({
      horizontal: React.PropTypes.oneOf(["left", "right"]),
      vertical: React.PropTypes.oneOf(["top", "bottom"]),
    }),
    children: React.PropTypes.node,
    contstrainWidth: React.PropTypes.bool,
    open: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    useLayerForClickAway: React.PropTypes.bool,
  };

  static defaultProps = {
    contstrainWidth: false,
    open: false,
    anchorOrigin: {
      horizontal: "left",
      vertical: "bottom",
    },
  };

  constructor() {
    super();
    this.state = {
      position: {},
    };
  }

  classes() {
    return {
      default: {
        Popover: {
          zIndex: zindex.Popover,
          display: "none",
          position: "fixed",
        },
        CloseLayer: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: zindex.PopoverClose,
        },
      },
      open: {
        Popover: {
          display: "block",
        },
      },
      anchored: {
        Popover: this.state.position,
      },
    };
  }

  calculatePosition(anchor, anchorOrigin) {
    return {
      top: this.getAnchorValue(anchor, anchorOrigin.vertical),
      left: this.getAnchorValue(anchor, anchorOrigin.horizontal),
      width: this.props.contstrainWidth ? anchor.width : undefined,
    };
  }

  getAnchorValue(anchor, key) {
    let anchorValue;
    switch (key) {
      case "top":
        anchorValue = anchor.top;
        break;
      case "bottom":
        anchorValue = anchor.bottom;
        break;
      case "left":
        anchorValue = anchor.left;
        break;
      case "right":
        anchorValue = anchor.right;
        break;
      default:
        break;
    }
    return anchorValue;
  }

  styles() {
    return this.css({
      open: this.props.open,
      anchored: !!this.props.anchorEl,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.anchorEl && nextProps.anchorOrigin) {
      this.updatePosition(nextProps.anchorEl, nextProps.anchorOrigin);
    }
  }

  componentWillMount() {
    this.updatePosition(this.props.anchorEl, this.props.anchorOrigin);
  }

  updatePosition(anchorEl, anchorOrigin) {
    if (anchorEl) {
      const anchor = anchorEl.getBoundingClientRect();
      this.setState({
        position: this.calculatePosition(anchor, anchorOrigin),
      });
    }
  }

  renderCloseLayer() {
    if (this.props.useLayerForClickAway) {
      return (
        <div
          style={this.styles().CloseLayer}
          onClick={this.props.onRequestClose}
          ref={c => this.closeLayerRef = c}
        />
      );
    }
    return null;
  }

  render() {
    return (
        <div style={this.styles().Popover}>
          <div style={this.styles().Popover}>
            {this.props.children}
          </div>
          {this.renderCloseLayer()}
        </div>
    );
  }
}
