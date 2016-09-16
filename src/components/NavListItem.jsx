import color from 'color';
import React from 'react';
import reactCSS from 'reactcss';
import Base from './Base';
import Text from './Text';
import VectorGraphic from './VectorGraphic';

export default class NavListItem extends Base {
  static propTypes = {
    expanded: React.PropTypes.bool,
    height: React.PropTypes.number,
    hovered: React.PropTypes.bool,
    icon: React.PropTypes.node,
    selected: React.PropTypes.bool,
    text: React.PropTypes.string,
    width: React.PropTypes.number,
    type: React.PropTypes.string,
  };

  static defaultProps = {
    expanded: true,
    height: 20,
    width: 20,
  };

  displayName = 'NavListItem';

  renderText(style) {
    if (this.props.text && this.props.expanded) {
      return (
        <div style={style.TextWrapper}>
          <Text
            fontSize={1}
          >
            {this.props.text}
          </Text>
        </div>
      );
    }
    return null;
  }

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        NavListItem: {
          padding: 10,
          background: clr.backgroundColors.primaryNavBar,
          color: clr.textColors.primaryNav,
          display: 'flex',
          alignItems: 'center',
        },
        TextWrapper: {
          flex: 5,
          marginLeft: 10,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
        Icon: {
          flex: 1,
          maxWidth: 60,
          textAlign: 'center',
        },
      },
      selected: {
        NavListItem: {
          background: clr.noticeColors.info,
          color: clr.textColors.light,
        },
      },
      hovered: {
        NavListItem: {
          background: color(clr.backgroundColors[this.props.type]).darken(0.5).hexString(),
          color: clr.textColors.selectedNavItem,
          cursor: 'pointer',
        },
      },
    }, {
      hovered: !!this.props.hovered,
      selected: !!this.props.selected,
    });
    return (
      <div style={style.NavListItem}>
        <div style={style.Icon}>
          <VectorGraphic
            height={this.props.height}
            width={this.props.width}
          >
            {this.props.icon}
          </VectorGraphic>
        </div>
        {this.renderText(style)}
      </div>
    );
  }
}
