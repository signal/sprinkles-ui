/* eslint react/no-render-return-value: "off" */
/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import ReactDOM from 'react-dom';
import zindex from '../shared/zindex';
import { Resets } from '../shared/styles';

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
      width: this.props.contentWidth ? this.props.contentWidth : triggerEl.width,
    };
  }

  updatePosition(triggerEl) {
    if (triggerEl) {
      // temp. place content on the page so we can get the height
      const div = document.createElement('div');
      div.style.position = 'absolute';
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

  renderTriggerElement() {
    return React.cloneElement(this.props.triggerEl, {
      ref: (c) => this.triggerElRef = c,
    });
  }

  render() {
    const width = this.state.position.width;
    const leftStateWidth = width > 0 ? `-${width}px` : 0;
    const leftSideOffset = this.props.contentWidth ? `-${(width / 2)}px` : leftStateWidth;
    const rightSideOffset = this.props.contentWidth ? `${(width / 2)}px` : `${width}px`;
    const style = reactCSS({
      default: {
        PopoverWrapper: {
          boxSizing: 'border-box',
          display: 'inline-flex',
          flexFlow: 'column nowrap',
          position: 'relative',
          width: '100%',
        },
        Popover: {
          boxSizing: 'border-box',
          flexFlow: 'column nowrap',
          position: 'absolute',
          transition: 'all 0.1s ease 0ms',
          width: this.props.contentWidth || '100%',
          visibility: 'hidden',
          zIndex: zindex.Popover,
        },
        TriggerWrapper: {
          flexFlow: 'column nowrap',
        },
        CloseLayer: {
          position: 'fixed',
          visibility: 'hidden',
        },
      },
      open: {
        CloseLayer: {
          bottom: 0,
          left: 0,
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
          transform: `translateX(-50%) translateY(${this.state.position.height}px)`,
        },
      },
      left: {
        PopoverWrapper: {
          flexFlow: 'row-reverse nowrap',
        },
        Popover: {
          top: '50%',
          transform: `translateY(-50%) translateX(${leftSideOffset})`,
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
          transform: `translateY(-50%) translateX(${rightSideOffset})`,
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
    style.TriggerWrapper = Object.assign({}, Resets.Button, style.TriggerWrapper);
    style.CloseLayer = Object.assign({}, Resets.Button, style.CloseLayer);
    return (
      <div style={style.PopoverWrapper}>
        {this.renderCloseLayer(style)}
        <div
          onClick={this.props.disabled ? null : this.onRequestOpen.bind(this)}
          style={style.TriggerWrapper}
        >
          {this.renderTriggerElement()}
        </div>
        <div
          ref={c => this.contentRef = c}
          style={style.Popover}
        >
          <span>
            {this.props.children}
          </span>
        </div>
      </div>
    );
  }
}
