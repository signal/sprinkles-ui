import React from 'react';
import reactCSS from 'reactcss';
import zindex from '../shared/zindex';

export default class Popover extends React.Component {
  static propTypes = {
    anchorEl: React.PropTypes.object,
    anchorOrigin: React.PropTypes.shape({
      horizontal: React.PropTypes.oneOf(['left', 'right']),
      vertical: React.PropTypes.oneOf(['top', 'bottom']),
    }),
    children: React.PropTypes.node,
    constrainWidth: React.PropTypes.bool,
    open: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    useLayerForClickAway: React.PropTypes.bool,
  };

  static defaultProps = {
    constrainWidth: false,
    open: false,
    anchorOrigin: {
      horizontal: 'left',
      vertical: 'bottom',
    },
  };

  displayName = 'Popover';

  constructor() {
    super();
    this.state = {
      position: {},
    };
  }

  componentWillMount() {
    this.updatePosition(this.props.anchorEl, this.props.anchorOrigin);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.anchorEl && nextProps.anchorOrigin) {
      this.updatePosition(nextProps.anchorEl, nextProps.anchorOrigin);
    }
  }

  getAnchorValue(anchor, key) {
    let anchorValue;
    switch (key) {
      case 'top':
        anchorValue = anchor.top;
        break;
      case 'bottom':
        anchorValue = anchor.bottom;
        break;
      case 'left':
        anchorValue = anchor.left;
        break;
      case 'right':
        anchorValue = anchor.right;
        break;
      default:
        break;
    }
    return anchorValue;
  }

  calculatePosition(anchor, anchorOrigin) {
    return {
      top: this.getAnchorValue(anchor, anchorOrigin.vertical),
      left: this.getAnchorValue(anchor, anchorOrigin.horizontal),
      width: this.props.constrainWidth ? anchor.width : undefined,
    };
  }

  updatePosition(anchorEl, anchorOrigin) {
    if (anchorEl) {
      const anchor = anchorEl.getBoundingClientRect();
      this.setState({
        position: this.calculatePosition(anchor, anchorOrigin),
      });
    }
  }

  renderCloseLayer(style) {
    if (this.props.useLayerForClickAway) {
      return (
        <div
          style={style.CloseLayer}
          onClick={this.props.onRequestClose}
          ref={c => this.closeLayerRef = c}
        />
      );
    }
    return null;
  }

  render() {
    const style = reactCSS({
      default: {
        Popover: {
          zIndex: zindex.Popover,
          display: 'none',
          position: 'fixed',
        },
        CloseLayer: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: zindex.PopoverClose,
        },
      },
      open: {
        Popover: {
          display: 'block',
        },
      },
      anchored: {
        Popover: this.state.position,
      },
    }, {
      open: this.props.open,
      anchored: !!this.props.anchorEl,
    });
    return (
        <div style={style.Popover}>
          <div style={style.Popover}>
            {this.props.children}
          </div>
          {this.renderCloseLayer(style)}
        </div>
    );
  }
}
