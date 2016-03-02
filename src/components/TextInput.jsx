import React from "react";
import ReactCSS from "reactcss";


export default class TextInput extends ReactCSS.Component {
  displayName = "TextInput";

  static propTypes ={
    handleChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string
  };

  static defaultProps = {
    value: ""
  };

  constructor() {
    super();
    this.state = {
      isFocused: false
    }
  }

  handleChange (e) {
    if (this.props.handleChange) {
      this.props.handleChange(e.target.value);
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
      }
    }
  }

  styles () {
    return this.css({
      "focus": this.state.isFocused
    })
  }

  render () {
    return (
        <input
            onBlur={this.handleBlur.bind(this)}
            onChange={this.handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            placeholder={this.props.placeholder}
            readOnly={!this.props.handleChange}
            style={this.styles().TextInput}
            value={this.props.value}
        />
    );
  }
};
