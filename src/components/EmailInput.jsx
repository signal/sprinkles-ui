/* eslint max-len: "off" */

import TextInput from './TextInput';

export default class EmailInput extends TextInput {
  displayName = 'EmailInput';

  validate() {
    // tried and true: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(this.value());
    const isInitialValue = this.value() === this.props.initialValue;
    return {
      valid: isValid,
      isInitialValue,
      validationError: isValid ? '' : 'Invalid email address',
    };
  }
}
