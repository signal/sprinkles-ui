import React from "react";
import ReactCSS from "reactcss";
import TextInput from "./TextInput";
import Text from "./Text";


export default class Field extends ReactCSS.Component {
  displayName = "Field";

  static propTypes = {
    children: React.PropTypes.node,
    error: React.PropTypes.string,
    label: React.PropTypes.string,
    required: React.PropTypes.bool,
    status: React.PropTypes.oneOf(["error", "warning", "success"])
  };

  static defaultProps = {
    required: false
  };

  classes () {
    return {
      "default": {
        Label: {
          margin: "10px 0"
        },
        Error: {
          margin: "10px 0"
        }
      }
    };
  }

  isValid () {
    const valid = this.inputRef && this.inputRef.isValid ? this.inputRef.isValid() : true;
    return !this.props.required || valid;
  }

  renderInput () {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        status: this.props.status,
        ref: childRef => this.inputRef = childRef
      });
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
          <span style={this.styles().Label}>
              <Text
                  color={color}
                  fontSize={18}
                  ref={c => this.labelRef = c}
              >
                  {this.props.label}
              </Text>
          </span>
      );
    }
  }

  renderError () {
    if (this.props.error) {
      return(
          <div style={this.styles().Error}>
              <Text
                  color={"red"}
                  fontSize={16}
                  ref={c => this.errorRef = c}
              >
                  {this.props.error}
              </Text>
          </div>
      );
    }
  }

  renderRequired () {
    if(this.props.required) {
      return(
          <span>
              {" "}
              <Text
                  color={"red"}
                  fontSize={18}
                  ref={c => this.requiredRef = c}
              >
                  {"*"}
              </Text>
          </span>
      );
    }
  }

  render () {
    return (
        <div>
            <div>
                {this.renderLabel()}{this.renderRequired()}
            </div>
            {this.renderInput()}
            {this.renderError()}
        </div>
    );
  }
};
