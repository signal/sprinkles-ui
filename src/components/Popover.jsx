import React from 'react';
import reactCSS from 'reactcss';
import ReactDOM from 'react-dom';
import zindex from '../shared/zindex';

export default class Popover extends React.Component {
  static propTypes = {
    anchorOrigin: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    children: React.PropTypes.node,
    contentWidth: React.PropTypes.number,
    open: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    onRequestOpen: React.PropTypes.func,
    triggerEl: React.PropTypes.node.isRequired,
    useLayerForClickAway: React.PropTypes.bool,
  };

  static defaultProps = {
    anchorOrigin: 'bottom',
    open: false,
    onRequestClose: () => {},
    onRequestOpen: () => {},
  };

  displayName = 'Popover';

  constructor() {
    super();
    this.state = {
      position: {},
    };
  }

  componentWillMount() {
    this.updatePosition(this.props.triggerEl, this.props.anchorOrigin);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggerEl && nextProps.anchorOrigin) {
      this.updatePosition(nextProps.triggerEl, nextProps.anchorOrigin);
    }
  }

  onRequestClose() {
    this.props.onRequestClose();
  }

  onRequestOpen() {
    this.props.onRequestOpen();
  }

  calculatePosition(triggerEl) {
    return {
      height: triggerEl.height,
      width: this.props.contentWidth ? this.props.contentWidth : '100%',
    };
  }

  updatePosition(triggerEl) {
    if (triggerEl) {
      // temp. place content on the page so we can get the height
      const div = document.createElement('div');
      document.body.appendChild(div);
      const component = ReactDOM.render(triggerEl, div);
      const node = ReactDOM.findDOMNode(component);
      const triggerElRect = node.getBoundingClientRect();
      this.setState({
        position: this.calculatePosition(triggerElRect),
      });
      div.remove();
    }
  }

  renderCloseLayer(style) {
    if (this.props.useLayerForClickAway) {
      return (
        <div
          style={style.CloseLayer}
          onClick={this.onRequestClose.bind(this)}
          ref={c => this.closeLayerRef = c}
        />
      );
    }
    return null;
  }

  render() {
    const style = reactCSS({
      default: {
        PopoverWrapper: {
          boxSizing: 'border-box',
          display: 'inline-flex',
          flexFlow: 'column nowrap',
          position: 'relative',
        },
        Popover: {
          boxSizing: 'border-box',
          flexFlow: 'column nowrap',
          position: 'absolute',
          transition: 'all 0.1s ease 0ms',
          width: this.state.position.width,
          visibility: 'hidden',
          zIndex: zindex.Popover,
        },
        TriggerWrapper: {
          flexFlow: 'column nowrap',
        },
        CloseLayer: {
          visibility: 'hidden',
        },
      },
      open: {
        CloseLayer: {
          bottom: 0,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: '100%',
          visibility: 'visible',
          zIndex: zindex.PopoverClose,
        },
        Popover: {
          opacity: 1,
          visibility: 'visible',
        },
      },
      anchored: {
        Popover: this.state.position,
      },
      bottom: {
        PopoverWrapper: {
          flexFlow: 'column nowrap',
        },
        Popover: {
          left: '50%',
          transform: 'translateX(-50%) translateY(0)',
        },
      },
      left: {
        PopoverWrapper: {
          flexFlow: 'row-reverse nowrap',
        },
        Popover: {
          top: '50%',
          transform: 'translateY(-50%) translateX(-100%)',
        },
        TriggerWrapper: {
          flexFlow: 'row-reverse nowrap',
        },
      },
      right: {
        PopoverWrapper: {
          flexFlow: 'row nowrap',
        },
        Popover: {
          top: '50%',
          transform: 'translateY(-50%) translateX(0)',
        },
        TriggerWrapper: {
          flexFlow: 'row nowrap',
        },
      },
      top: {
        PopoverWrapper: {
          flexFlow: 'column-reverse nowrap',
        },
        Popover: {
          bottom: 0,
          left: '50%',
          transform: `translateX(-50%) translateY(-${this.state.position.height}px)`,
        },
        TriggerWrapper: {
          flexFlow: 'column-reverse nowrap',
        },
      },
    }, {
      open: this.props.open,
      bottom: this.props.anchorOrigin === 'bottom',
      left: this.props.anchorOrigin === 'left',
      right: this.props.anchorOrigin === 'right',
      top: this.props.anchorOrigin === 'top',
    });
    return (
      <div style={style.PopoverWrapper}>
        {this.renderCloseLayer(style)}
        <div
          onClick={this.props.disabled ? null : this.onRequestOpen.bind(this)}
          style={style.TriggerWrapper}
        >
          {this.props.triggerEl}
        </div>
        <div
          ref={c => this.contentRef = c}
          style={style.Popover}
        >
          <span onClick={this.onRequestClose.bind(this)}>
            {this.props.children}
          </span>
        </div>
      </div>
    );
  }
}
