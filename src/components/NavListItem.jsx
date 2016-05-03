import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import VectorGraphic from "./VectorGraphic";
import color from "color";
import {
  Colors,
  BackgroundColors,
  TextColors,
 } from "../shared/colors";

export default class NavListItem extends ReactCSS.Component {
  displayName = "NavListItem";

  static propTypes = {
    expanded: React.PropTypes.bool,
    hovered: React.PropTypes.bool,
    icon: React.PropTypes.node,
    selected: React.PropTypes.bool,
    text: React.PropTypes.string,
    paddingLeft: React.PropTypes.number,
  };

  static defaultProps = {
    expanded: true,
    paddingLeft: 17,
  };

  classes() {
    const darkened = color(BackgroundColors[this.props.type])
        .darken(0.5).hexString();
    return {
      default: {
        NavListItem: {
          padding: 10,
          background: BackgroundColors.primaryNavBar,
          color: TextColors.primaryNav,
        },
        TextWrapper: {
          marginLeft: 20,
        },
        NavIcon: {
          display: "inline-block",
          paddingLeft: this.props.paddingLeft,
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
          background: darkened,
          color: TextColors.selectedNavItem,
          cursor: "pointer",
        },
      },
    };
  }

  styles() {
    return this.css({
      hovered: !!this.props.hovered,
      selected: !!this.props.selected,
    });
  }

  renderText() {
    if (this.props.text && this.props.expanded) {
      return (
        <span style={this.styles().TextWrapper}>
          <Text
            fontSize={1}
          >
            {this.props.text}
          </Text>
        </span>
      );
    }
    return null;
  }

  render() {
    return (
      <div style={this.styles().NavListItem}>
        <div style={this.styles().NavIcon}>
          <VectorGraphic
            height={10}
            width={10}
          >
            {this.props.icon}
          </VectorGraphic>
        </div>
        {this.renderText()}
      </div>
    );
  }
}
