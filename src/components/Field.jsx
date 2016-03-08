import React from "react";
import ReactCSS from "reactcss";
import TextInput from "./TextInput";
import Text from "./Text";


export default class Field extends ReactCSS.Component {
  displayName = "Field";

  static propTypes = {
    children: React.PropTypes.node,
    initialValue: React.PropTypes.string,
    label: React.PropTypes.string,
    status: React.PropTypes.oneOf(["error", "warning", "success"])
  };

  constructor (props) {
    super(props);
    this.state = {
      value: props.initialValue
    };
  }

  classes () {
    return {
      "default": {
        Label: {
          margin: "10px 0",
        }
      }
    };
  }

  linkState () {
    return {
      value: this.state.value,
      requestChange: (newValue) => this.setState({value: newValue})
    }
  }

  renderInput () {
    return React.Children.map(this.props.children, (child) => {
      switch (child.type) {
        case TextInput:
          return React.cloneElement(child, {
            status: this.props.status,
            valueLink: this.linkState(),
            ref: c => this.inputRef = c
          });
        default:
          throw new Error("Unknown Child Type")
      }
    });
  }

  renderLabel () {
    if (this.props.label) {
      let color;
      switch (this.props.status) {
        case "error":
          color = "red";
          break;
        case "warning":
          color = "orange";
          break;
        case "success":
          color = "green";
          break;
      }
      return (
          <div style={this.styles().Label}>
              <Text
                  color={color}
                  fontSize={18}
                  ref={c => this.labelRef = c}
              >
                  {this.props.label}
              </Text>
          </div>
      );
    }
  }

  render () {
    return (
        <div>
            {this.renderLabel()}
            {this.renderInput()}
        </div>
    );
  }
};
