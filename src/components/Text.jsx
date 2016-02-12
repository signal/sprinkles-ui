import React from "react";
import ReactCSS from "reactcss";

export default class Text extends ReactCSS.Component {
  displayName = "Text";

  static propTypes = {
    color: React.PropTypes.string
  };

  classes () {
    return {
      "default": {
        span: {
          fontSize: 12
        }
      },
      "color": {
        span: {
          color: this.props.color
        }
      }
    };
  }

  styles () {
    return this.css({
      "color": !!this.props.color
    });
  }

  render () {
    return (
        <span style={this.styles().span}>
          {this.props.children}
        </span>
    );
  }
};
