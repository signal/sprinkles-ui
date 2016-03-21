import React from "react";
import TextInput from "./TextInput";

export default class EmailInput extends TextInput {
  // TODO: override validate method
  validate () {
    // tried and true: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(this.state.value);
    const isInitialValue = this.state.value === this.props.initialValue;
    return {
      valid: isValid,
      isInitialValue: isInitialValue,
      validationError: isValid ? "" : "Invalid email address"
    }
  }
};
