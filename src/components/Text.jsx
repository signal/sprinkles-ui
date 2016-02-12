import React from "react";
import ReactCSS from "reactcss";

export default class Text extends ReactCSS.Component {
  displayName = "Text";

  static propTypes = {
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number
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
      },
      "fontSize": {
        span: {
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
        <span style={this.styles().span}>
          {this.props.children}
        </span>
    );
  }
};
