import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import {
  Colors,
  BackgroundColors,
  TextColors,
  StructuralColors,
 } from "../shared/colors";

export default class TextListItem extends ReactCSS.Component {
  displayName = "TextListItem";

  static propTypes = {
    hovered: React.PropTypes.bool,
    listPosition: React.PropTypes.oneOf(["first", "middle", "last"]),
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    text: React.PropTypes.string,
  };

  classes() {
    return {
      default: {
        Text: {
          padding: 10,
          background: BackgroundColors.primary,
          color: TextColors.primary,
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
          background: BackgroundColors.accent,
          color: TextColors.accent,
          cursor: "pointer",
        },
      },
      first: {
        Text: {
          borderBottom: `1px solid ${StructuralColors.divider}`,
        },
      },
      middle: {
        Text: {
          borderBottom: `1px solid ${StructuralColors.divider}`,
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
      <div
        onClick={this.props.onClick}
        style={this.styles().Text}
      >
        <Text
          fontSize={1}
        >
          {this.props.text}
        </Text>
      </div>
    );
  }
}
