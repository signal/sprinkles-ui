import React from "react";
import ReactCSS from "reactcss";
import TextInput from "./TextInput";
import Text from "./Text";
import { Colors, TextColors } from "../shared/colors";
import Color from "color";


export default class Field extends ReactCSS.Component {
  displayName = "Field";

  static propTypes = {
    children: React.PropTypes.node,
    enabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    fieldKey: React.PropTypes.string,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    status: React.PropTypes.oneOf(["error", "warning", "success"]),
    style: React.PropTypes.object
  };

  static defaultProps = {
    enabled: true,
    fieldKey: "defaultKey",
    onChange: () => {},
    required: false,
    style: {}
  };

  classes () {
    return {
      "default": {
        Label: {
          margin: "10px 0",
          color: TextColors.dark
        },
        Error: {
          margin: "10px 0"
        }
      },
      "disabled": {
        Label: {
          color: Color(TextColors.dark).lighten(0.9).hexString()
        }
      }
    };
  }

  styles () {
    return this.css({
      "disabled": !this.props.enabled
    })
  }

  handleChange (change) {
    this.props.onChange(change, this);
  }

  validate () {
    const validation = this.inputRef && this.inputRef.validate ? this.inputRef.validate() : {};
    return {
      valid: validation.valid === false ? false : true,
      required: this.props.required,
      isInitialValue: validation.isInitialValue === false ? false : true,
      validationError: validation.validationError || ""
    }
  }

  renderInput () {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        enabled: this.props.enabled,
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
          color = Colors.danger;
          break;
        case "warning":
          color = Colors.warning;
          break;
        case "success":
          color = Colors.success;
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
                  color={Colors.danger}
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
                  color={Colors.danger}
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
