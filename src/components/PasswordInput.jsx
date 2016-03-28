import React from "react";
import TextInput from "./TextInput";


export default class PasswordInput extends TextInput {
  displayName = "PasswordInput";

  constructor() {
    super({initialValue: ""});
  }

  render () {
    return (
        <input
            disabled={this.props.enabled ? undefined : "disabled"}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            placeholder={this.props.placeholder}
            style={this.styles().TextInput}
            type={"password"}
            valueLink={this.linkState()}
        />
    );
  }
};
