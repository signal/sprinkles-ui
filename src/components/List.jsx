import React from "react";
import ReactCSS from "reactcss";

export default class List extends ReactCSS.Component {
  static displayName = "List";

  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func
  };

  classes () {
    return {
      "default": {
        List: {}
      }
    };
  }

  render () {
    return (
        <div
            onClick={this.props.onClick}
            style={this.styles().List}
        >
          {this.props.children}
        </div>
    );
  }
}
