import React from "react";
import ReactCSS from "reactcss";

export default class Text extends ReactCSS.Component {
  displayName = "Text";

  static propTypes = {
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number
  };

  classes () {
    return {
      "default": {
        Text: {
          fontSize: 12,
          transition: "color .2s ease"
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
      }
    };
  }

  styles () {
    return this.css({
      "color": !!this.props.color,
      "fontSize": !!this.props.fontSize
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
