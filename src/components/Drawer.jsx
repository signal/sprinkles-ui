import React from 'react';
import ReactCSS from 'reactcss';
import zindex from '../shared/zindex';
import { BackgroundColors } from '../shared/colors';

export default class Drawer extends ReactCSS.Component {
  displayName = 'Drawer';

  static propTypes = {
    backgroundColor: React.PropTypes.string,
    children: React.PropTypes.node,
    open: React.PropTypes.bool,
    openFrom: React.PropTypes.oneOf(['left', 'right']),
    width: React.PropTypes.number,
  };

  static defaultProps = {
    open: false,
    openFrom: 'right',
    width: 300,
  };

  classes() {
    return {
      default: {
        Drawer: {
          width: this.props.width,
          height: '100%',
          position: 'fixed',
          top: 0,
          right: this.props.openFrom === 'right' ? this.props.width * -1 : undefined,
          left: this.props.openFrom === 'left' ? this.props.width * -1 : undefined,
          background: BackgroundColors.primary,
          zIndex: zindex.Drawer,
          transition: 'all 0.3s ease',
        },
      },
      open: {
        Drawer: {
          right: this.props.openFrom === 'right' ? 0 : undefined,
          left: this.props.openFrom === 'left' ? 0 : undefined,
        },
      },
      backgroundColor: {
        Drawer: {
          background: this.props.backgroundColor,
        },
      },
    };
  }

  styles() {
    return this.css({
      open: this.props.open,
      backgroundColor: !!this.props.backgroundColor,
    });
  }

  render() {
    return (
      <div
        style={this.styles().Drawer}
      >
        {this.props.children}
      </div>
    );
  }
}
