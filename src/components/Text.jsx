import React from "react";
import ReactCSS from "reactcss";

export default class Text extends ReactCSS.Component {
  displayName = "Text";

  static propTypes = {
    text: React.PropTypes.string
  };

  static defaultProps = {
    text: ""
  };

  classes () {
    return {
      "default": {
        span: {
          fontSize: 12
        }
      }
    }
  }

  render () {
    return (
        <span style={this.styles().span}>
          {this.props.text}
        </span>
    );
  }
};
