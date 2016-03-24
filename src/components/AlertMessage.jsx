import React from "react";
import ReactCSS from "reactcss";
import color from "color";
import colors from "../shared/colors";

export default class AlertMessage extends ReactCSS.Component {
  displayName = "AlertMessage";

  static propTypes = {
    body: React.PropTypes.string,
    children: React.PropTypes.node,
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(["success", "info", "warning", "danger"]).isRequired
  };

  classes () {
    return {
      "default": {
        list: {
          listStyle: "square",
          textAlign: "left"
        },
        AlertMessage: {
          color: "#fff",
          fontSize: 16,
          padding: "2% 2% 0 2%",
          width: "96%"
        },
        bodyWrapper: {
          marginBottom: "2%"
        },
        title: {
          fontWeight: "bold",
          display: "inlineBlock",
          marginRight: "5px"
        }
      },
      "success": {
        AlertMessage: {
          backgroundColor: colors.success,
          border: "1px solid " + color(colors.success).darken(0.1).hexString()
        }
      },
      "info": {
        AlertMessage: {
          backgroundColor: colors.info,
          border: "1px solid " + color(colors.info).darken(0.1).hexString()
        }
      },
      "warning": {
        AlertMessage: {
          backgroundColor: colors.warning,
          border: "1px solid " + color(colors.warning).darken(0.1).hexString()
        }
      },
      "danger": {
        AlertMessage: {
          backgroundColor: colors.danger,
          border: "1px solid " + color(colors.danger).darken(0.1).hexString()
        }
      }
    }
  }

  styles () {
    return this.css({
      "success": this.props.type === "success",
      "info": this.props.type === "info",
      "warning": this.props.type === "warning",
      "danger": this.props.type === "danger"
    })
  }

  render () {
    return (
        <div style={this.styles().AlertMessage}>
            <div style={this.styles().bodyWrapper}>
                <span style={this.styles().title}>
                  {this.props.title}
                </span>{this.props.body}
            </div>
            {this.props.children}
        </div>
    );
  }
};
