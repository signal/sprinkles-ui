import React from "react";
import ReactCSS from "reactcss";

export default class Text extends ReactCSS.Component {
  displayName = "Text";

  static propTypes = {
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number,
    fontWeight: React.PropTypes.string,
    textDecoration: React.PropTypes.oneOf(["underline", "overline", "line-through"]),
  };

  classes() {
    return {
      default: {
        Text: {
          fontSize: "1rem",
        },
      },
      color: {
        Text: {
          color: this.props.color,
        },
      },
      fontSize: {
        Text: {
          fontSize: `${this.props.fontSize}rem`,
        },
      },
      fontWeight: {
        Text: {
          fontWeight: this.props.fontWeight,
        },
      },
      textDecoration: {
        Text: {
          textDecoration: this.props.textDecoration,
        },
      },
    };
  }

  styles() {
    return this.css({
      color: !!this.props.color,
      fontSize: !!this.props.fontSize,
      fontWeight: !!this.props.fontWeight,
      textDecoration: !!this.props.textDecoration,
    });
  }

  render() {
    return (
        <span style={this.styles().Text}>
          {this.props.children}
        </span>
    );
  }
}
