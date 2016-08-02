import color from 'color';
import React from 'react';
import reactCSS from 'reactcss';
import Text from './Text';
import VectorGraphic from './VectorGraphic';
import {
  Colors,
  BackgroundColors,
  TextColors,
 } from '../shared/colors';

export default class NavListItem extends React.Component {
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
    const style = reactCSS({
      default: {
        NavListItem: {
          padding: 10,
          background: BackgroundColors.primaryNavBar,
          color: TextColors.primaryNav,
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
          background: Colors.info,
          color: TextColors.light,
        },
      },
      hovered: {
        NavListItem: {
          background: color(BackgroundColors[this.props.type]).darken(0.5).hexString(),
          color: TextColors.selectedNavItem,
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
