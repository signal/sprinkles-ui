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
  };

  static defaultProps = {
    expanded: true,
  };

  classes() {
    return {
      default: {
        NavListItem: {
          padding: 10,
          background: BackgroundColors.primaryNavBar,
          color: TextColors.primaryNav,
          display: "flex",
          alignItems: "center",
        },
        TextWrapper: {
          marginLeft: 10,
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
        <div style={this.styles().TextWrapper}>
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
    return (
      <div style={this.styles().NavListItem}>
        <div>
          <VectorGraphic
            height={12}
            width={12}
          >
            {this.props.icon}
          </VectorGraphic>
        </div>
        {this.renderText()}
      </div>
    );
  }
}
