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
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    status: React.PropTypes.oneOf(["error", "warning", "success"]),
    style: React.PropTypes.object
  };

  static defaultProps = {
    onChange: () => {},
    required: false,
    style: {}
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

  handleChange (change) {
    this.props.onChange(change, this);
  }

  isValid () {
    const valid = this.inputRef && this.inputRef.isValid ? this.inputRef.isValid() : true;
    return !this.props.required || valid;
  }

  renderInput () {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        onChange: this.handleChange.bind(this),
        ref: childRef => this.inputRef = childRef,
        status: this.props.status
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
        <div style={this.props.style}>
            <div>
                {this.renderLabel()}{this.renderRequired()}
            </div>
            {this.renderInput()}
            {this.renderError()}
        </div>
    );
  }
};
