import React from "react";
import ReactCSS from "reactcss";
import Color from "color";
import { Colors, TextColors } from "../shared/colors";
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
          backgroundColor: Colors.success,
          border: "1px solid " + Color(Colors.success).darken(0.1).hexString()
        }
      },
      "info": {
        AlertMessage: {
          backgroundColor: Colors.info,
          border: "1px solid " + Color(Colors.info).darken(0.1).hexString()
        }
      },
      "warning": {
        AlertMessage: {
          backgroundColor: Colors.warning,
          border: "1px solid " + Color(Colors.warning).darken(0.1).hexString()
        }
      },
      "danger": {
        AlertMessage: {
          backgroundColor: Colors.danger,
          border: "1px solid " + Color(Colors.danger).darken(0.1).hexString()
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
          <Text
              color={TextColors.light}
              fontSize={16}
              fontWeight={"bold"}
              ref={c => this.titleRef = c}
          >
            {this.props.title}
          </Text>
      );
    }
  }

  renderDetails () {
    if (this.props.details) {
      return(
          <span>
              {" "}
              <Text
                  color={TextColors.light}
                  fontSize={16}
                  ref={c => this.detailsRef = c}
              >
                {this.props.details}
              </Text>
          </span>
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
            <div style={this.styles().AlertItem}>
                {this.renderTitle()}
                {this.renderDetails()}
            </div>
            {this.renderChildren()}
        </div>
    );
  }
};
