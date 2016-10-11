import React from 'react';
import reactCSS from 'reactcss';
import { BackgroundColors } from '../shared/colors';

export default class SecondaryNav extends React.Component {
  static propTypes = {
    leftItems: React.PropTypes.node,
    rightItems: React.PropTypes.node,
  };

  displayName = 'SecondaryNav';

  renderLeftItems(style) {
    if (this.props.leftItems) {
      return (
        <div
          style={style.LeftItems}
          ref={c => this.leftItemsRef = c}
        >
          {this.props.leftItems}
        </div>
      );
    }
    return null;
  }

  renderRightItems(style) {
    if (this.props.rightItems) {
      return (
        <div
          style={style.RightItems}
          ref={c => this.rightItemsRef = c}
        >
          {this.props.rightItems}
        </div>
      );
    }
    return null;
  }

  render() {
    const style = reactCSS({
      default: {
        SecondaryNav: {
          display: 'flex',
          flexWrap: 'nowrap',
          height: '100%',
          alignItems: 'center',
          padding: '0 20px',
          background: BackgroundColors.secondaryNav,
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
    });
    return (
      <div
        style={style.SecondaryNav}
      >
        {this.renderLeftItems(style)}
        {this.renderRightItems(style)}
      </div>
    );
  }
}
