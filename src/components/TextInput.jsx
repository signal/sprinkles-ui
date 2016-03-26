import React from "react";
import ReactCSS from "reactcss";
import { Colors } from "../shared/colors";


export default class TextInput extends ReactCSS.Component {
  displayName = "TextInput";

  static propTypes = {
    autoComplete: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    status: React.PropTypes.oneOf(["error", "warning", "success"])
  };

  static defaultProps = {
    autoComplete: true,
    initialValue: ""
  };

  constructor(props) {
    super();
    this.state = {
      isFocused: false,
      value: props.initialValue
    }
  }

  validate () {
    const isEmpty = this.state.value === "";
    const isInitialValue = this.state.value === this.props.initialValue;
    return {
      valid: !isEmpty,
      isInitialValue: isInitialValue,
      validationError: !isEmpty ? "" : "Field Must Not Be Empty"
    }
  }

  linkState () {
    return {
      value: this.state.value,
      requestChange: (newValue) => {
        if (this.props.onChange) {
          this.props.onChange(newValue);
        }
        this.setState({value: newValue})
      }
    };
  }

  handleFocus () {
    this.setState({isFocused: true});
  }

  handleBlur () {
    this.setState({isFocused: false});
  }

  classes () {
    return {
      "default": {
        TextInput: {
          fontSize: 16,
          padding: "12px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: 3,
          outline: "none"
        }
      },
      "focus": {
        TextInput: {
          boxShadow: "0 0 3px 1px " + Colors.info
        },
      },
      "success": {
        TextInput: {
          boxShadow: "0 0 3px 1px " + Colors.success
        }
      },
      "warning": {
        TextInput: {
          boxShadow: "0 0 3px 1px " + Colors.warning
        }
      },
      "error": {
        TextInput: {
          boxShadow: "0 0 3px 1px " + Colors.danger
        }
      }
    }
  }

  styles () {
    return this.css({
      "focus": this.state.isFocused,
      "success": this.props.status === "success",
      "warning": this.props.status === "warning",
      "error": this.props.status === "error"
    })
  }

  render () {
    return (
        <input
            autoComplete={this.props.autoComplete ? "on" : "off"}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            placeholder={this.props.placeholder}
            style={this.styles().TextInput}
            valueLink={this.linkState()}
        />
    );
  }
};
