import React from "react";
import ReactCSS from "reactcss";
import { Colors, TextColors } from "../shared/colors";
import color from "color";


export default class TextInput extends ReactCSS.Component {
  displayName = "TextInput";

  static propTypes = {
    autoComplete: React.PropTypes.bool,
    boundValue: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    status: React.PropTypes.oneOf(["error", "warning", "success"]),
  };

  static defaultProps = {
    autoComplete: true,
    enabled: true,
    initialValue: "",
    onChange: () => {},
  };

  constructor(props) {
    super();
    this.state = {
      isFocused: false,
      value: props.initialValue,
    };
  }

  validate() {
    const isEmpty = this.value() === "";
    const isInitialValue = this.value() === this.props.initialValue;
    return {
      valid: !isEmpty,
      isInitialValue,
      validationError: !isEmpty ? "" : "Field Must Not Be Empty",
    };
  }

  value() {
    return this.state.value;
  }

  linkState() {
    return {
      value: this.value(),
      requestChange: (newValue) => {
        this.setState({ value: newValue }, () => this.props.onChange(this.value()));
      },
    };
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleChange(changeEvent) {
    this.props.onChange(changeEvent.target.value);
  }

  classes() {
    return {
      default: {
        TextInput: {
          fontSize: 16,
          padding: "12px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: 3,
          outline: "none",
          color: TextColors.dark,
        },
      },
      focus: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${Colors.info}`,
        },
      },
      success: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${Colors.success}`,
        },
      },
      warning: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${Colors.warning}`,
        },
      },
      error: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${Colors.danger}`,
        },
      },
      disabled: {
        TextInput: {
          color: color(TextColors.dark).lighten(0.9).hexString(),
          cursor: "not-allowed",
        },
      },
    };
  }

  styles() {
    return this.css({
      focus: this.state.isFocused,
      success: this.props.status === "success",
      warning: this.props.status === "warning",
      error: this.props.status === "error",
      disabled: !this.props.enabled,
    });
  }

  isBound() {
    return this.props.boundValue !== undefined;
  }

  render() {
    return (
      <input
        autoComplete={this.props.autoComplete ? "on" : "off"}
        disabled={this.props.enabled ? undefined : "disabled"}
        onBlur={this.handleBlur.bind(this)}
        onChange={this.isBound() ? this.handleChange.bind(this) : undefined}
        onFocus={this.handleFocus.bind(this)}
        placeholder={this.props.placeholder}
        style={this.styles().TextInput}
        value={this.isBound() ? this.props.boundValue : undefined}
        valueLink={!this.isBound() ? this.linkState() : undefined}
      />
    );
  }
}
