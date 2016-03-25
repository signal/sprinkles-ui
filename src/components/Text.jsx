import React from "react";
import ReactCSS from "reactcss";

export default class Text extends ReactCSS.Component {
  displayName = "Text";

  static propTypes = {
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number,
    fontWeight: React.PropTypes.string
  };

  classes () {
    return {
      "default": {
        Text: {
          fontSize: 12
        }
      },
      "color": {
        Text: {
          color: this.props.color
        }
      },
      "fontSize": {
        Text: {
          fontSize: this.props.fontSize
        }
      },
      "fontWeight": {
        Text: {
          fontWeight: this.props.fontWeight
        }
      }
    };
  }

  styles () {
    return this.css({
      "color": !!this.props.color,
      "fontSize": !!this.props.fontSize,
      "fontWeight": !!this.props.fontWeight
    });
  }

  render () {
    return (
        <span style={this.styles().Text}>
          {this.props.children}
        </span>
    );
  }
};
