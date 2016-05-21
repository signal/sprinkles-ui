import React from 'react';
import ReactCSS from 'reactcss';
import { BackgroundColors } from '../shared/colors';

export default class SecondaryNav extends ReactCSS.Component {
  displayName = 'SecondaryNav';

  static propTypes = {
    leftItems: React.PropTypes.node,
    rightItems: React.PropTypes.node,
  };

  classes() {
    return {
      default: {
        SecondaryNav: {
          display: 'flex',
          flexWrap: 'nowrap',
          height: '100%',
          alignItems: 'center',
          padding: '0 20px',
          background: BackgroundColors.primary,
        },
        LeftItems: {
          flex: 1,
          display: 'flex',
        },
        RightItems: {
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        },
      },
    };
  }

  renderLeftItems() {
    if (this.props.leftItems) {
      return (
        <div
          style={this.styles().LeftItems}
          ref={c => this.leftItemsRef = c}
        >
          { this.props.leftItems }
        </div>
      );
    }
    return null;
  }

  renderRightItems() {
    if (this.props.rightItems) {
      return (
        <div
          style={this.styles().RightItems}
          ref={c => this.rightItemsRef = c}
        >
          { this.props.rightItems }
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div
        style={this.styles().SecondaryNav}
      >
        {this.renderLeftItems()}
        {this.renderRightItems()}
      </div>
    );
  }
}
