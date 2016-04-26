import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import {
  BackgroundColors,
  TextColors,
} from "../shared/colors";

export default class NavBar extends ReactCSS.Component {
  displayName = "NavBar";

  static propTypes = {
    position: React.PropTypes.oneOf(["fixed", undefined]),
    title: React.PropTypes.string,
  }

  classes() {
    return {
      default: {
        NavBar: {
          width: "100%",
          height: 55,
          background: BackgroundColors.navBar,
        },
      },
      fixed: {
        NavBar: {
          top: 0,
          left: 0,
          right: 0,
          position: "fixed",
        },
      },
    };
  }

  styles() {
    return this.css({
      fixed: this.props.position === "fixed",
    });
  }

  render() {
    return (
      <div style={this.styles().NavBar}>
        <Text
          fontSize={1.5}
          color={TextColors.light}
          ref={c => this.titleRef = c}
        >
          {this.props.title}
        </Text>
      </div>
    );
  }
}
