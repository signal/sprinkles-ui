import React from "react";
import ReactCSS from "reactcss";
import color from "color";
import Text from "./Text";
import {
  Colors,
  BackgroundColors,
  TextColors,
 } from "../shared/colors";

export default class TextListItem extends ReactCSS.Component {
  displayName = "TextListItem";

  static propTypes = {
    hovered: React.PropTypes.bool,
    listPosition: React.PropTypes.oneOf(["first", "middle", "last"]),
    selected: React.PropTypes.bool,
    text: React.PropTypes.string,
  };

  classes() {
    return {
      default: {
        Text: {
          padding: 10,
          background: "#FEFEFE",
          color: TextColors.dark,
        },
      },
      selected: {
        Text: {
          background: Colors.info,
          color: TextColors.light,
        },
      },
      hovered: {
        Text: {
          background: color(BackgroundColors.dark).lighten(1.3).hexString(),
          color: TextColors.light,
          cursor: "pointer",
        },
      },
      first: {
        Text: {
          borderBottom: `1px solid ${color(TextColors.dark).lighten(1.5).hexString()}`,
        },
      },
      middle: {
        Text: {
          borderBottom: `1px solid ${color(TextColors.dark).lighten(1.5).hexString()}`,
        },
      },
    };
  }

  styles() {
    return this.css({
      hovered: !!this.props.hovered,
      selected: !!this.props.selected,
      first: this.props.listPosition === "first",
      middle: this.props.listPosition === "middle",
    });
  }

  render() {
    return (
      <div style={this.styles().Text}>
        <Text
          fontSize={16}
        >
          {this.props.text}
        </Text>
      </div>
    );
  }
}
