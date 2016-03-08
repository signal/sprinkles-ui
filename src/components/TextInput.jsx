import React from "react";
import ReactCSS from "reactcss";


export default class TextInput extends ReactCSS.Component {
  displayName = "TextInput";

  static propTypes = {
    placeholder: React.PropTypes.string,
    status: React.PropTypes.oneOf(["error", "warning", "success"]),
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.string,
      requestChange: React.PropTypes.func
    })
  };

  constructor(props) {
    super();
    this.state = {
      isFocused: false
    }
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
          outline: "none",
          transition: "box-shadow .2s ease"
        }
      },
      "focus": {
        TextInput: {
          boxShadow: "0 0 3px 1px #4285F4"
        },
      },
      "success": {
        TextInput: {
          boxShadow: "0 0 3px 1px green"
        }
      },
      "warning": {
        TextInput: {
          boxShadow: "0 0 3px 1px orange"
        }
      },
      "error": {
        TextInput: {
          boxShadow: "0 0 3px 1px red"
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
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            placeholder={this.props.placeholder}
            style={this.styles().TextInput}
            valueLink={this.props.valueLink}
        />
    );
  }
};
