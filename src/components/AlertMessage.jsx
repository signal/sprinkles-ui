import React from "react";
import ReactCSS from "reactcss";
import color from "color";
import colors from "../shared/colors";
import Text from "./Text";

export default class AlertMessage extends ReactCSS.Component {
  displayName = "AlertMessage";

  static propTypes = {
    children: React.PropTypes.node,
    details: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(["success", "info", "warning", "danger"]).isRequired
  };

  classes () {
    return {
      "default": {
        AlertMessage: {
          padding: "10px 10px 0 10px"
        },
        AlertItem: {
          paddingBottom: "10px"
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

  renderTitle () {
    if (this.props.title) {
      return(
          <div style={this.styles().AlertItem}>
              <Text
                  color={"#fff"}
                  fontSize={16}
                  fontWeight={"bold"}
                  ref={c => this.titleRef = c}
              >
                {this.props.title}
              </Text>
          </div>
      );
    }
  }

  renderDetails () {
    if (this.props.details) {
      return(
          <div style={this.styles().AlertItem}>
              <Text
                  color={"#fff"}
                  fontSize={16}
                  ref={c => this.detailsRef = c}
              >
                {this.props.details}
              </Text>
          </div>
      );
    }
  }

  renderChildren () {
    if (this.props.children) {
      return (
          <div style={this.styles().AlertItem}>
              {this.props.children}
          </div>
      );
    }
  }

  render () {
    return (
        <div style={this.styles().AlertMessage}>
            {this.renderTitle()}
            {this.renderDetails()}
            {this.renderChildren()}
        </div>
    );
  }
};
