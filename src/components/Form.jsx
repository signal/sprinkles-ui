import React from "react";
import ReactCSS from "reactcss";
import Button from "./Button";
import Alert from "./Alert";

export default class Form extends ReactCSS.Component {
  displayName = "Form";

  static propTypes = {
    alert: React.PropTypes.shape({
      type: React.PropTypes.oneOf(["success", "info", "warning", "danger"]).required,
      title: React.PropTypes.string.required,
      details: React.PropTypes.string.required,
      children: React.PropTypes.node
    }),
    children: React.PropTypes.node,
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    submitButtonText: React.PropTypes.string,
    working: React.PropTypes.bool
  };

  static defaultProps = {
    onChange: () => {},
    onSubmit: () => {},
    submitButtonText: "Submit",
    working: false
  };

  constructor() {
    super();
    this.state = {
      inputValidations: {}
    }
  }

  classes () {
    return {
      "default": {
        Field: {
          margin: "10px 0"
        }
      }
    };
  }

  currentValues () {
    let submitData = {};
    this.inputRefs.forEach((input) => {
      submitData[input.props.fieldKey] = input.inputRef.value();
    });
    return submitData;
  }

  handleClick (e) {
    if (this.validate()) {
      this.props.onSubmit(this.currentValues());
    }
  }

  handleChange (change, inputRef) {
    this.props.onChange(this.currentValues());
    if (!Object.keys(this.state.inputValidations).length) {
      return;
    }
    let newInputStatuses = {};
    this.inputRefs.forEach((input, i) => {
      const inputValidation = this.state.inputValidations[i];
      if (inputValidation) {
        let valid = inputValidation.valid;
        let validationError = inputValidation.validationError;
        if (i === inputRef.props.fieldId) {
          valid = true;
          validationError = "";
        }
        newInputStatuses[i] = {
          valid: valid,
          validationError: validationError
        }
      }
    });
    this.setState({
      inputValidations: newInputStatuses
    });
  }

  validate () {
    let newInputStatuses = {};
    let formIsValid = true;
    this.inputRefs.forEach((input, i) => {
      const validation = input.validate();
      const inputIsValid = !validation.required || validation.valid;
      if (!inputIsValid) {
        formIsValid = false;
      }
      newInputStatuses[i] = {
        valid: inputIsValid,
        validationError: inputIsValid ? "" : validation.validationError
      };
    });
    this.setState({
      inputValidations: newInputStatuses
    });
    return formIsValid;
  }

  invalidateFields (invalidFields) {
    let invalidationMap = {};
    let newInputStatuses = {};
    invalidFields.forEach((invalidation) => {
      invalidationMap[invalidation.fieldKey] = invalidation.validationError;
    });
    this.inputRefs.forEach((input, i) => {
      const fieldKey = input.props.fieldKey;
      if (invalidationMap[fieldKey]) {
        newInputStatuses[i] = {
          valid: false,
          validationError: invalidationMap[fieldKey]
        };
      }
    });
    if (Object.keys(newInputStatuses).length === 0) {
      return;
    }
    this.setState({
      inputValidations: newInputStatuses
    });
  }

  renderFields () {
    return React.Children.map(this.props.children, (child, i) => {
      const inputValidation = this.state.inputValidations[i] || {};
      return React.cloneElement(child, {
        fieldId: i,
        onChange: this.handleChange.bind(this),
        status: inputValidation.valid === false ? "error" : undefined,
        error: inputValidation.validationError,
        style: this.styles().Field,
        ref: (inputRef) => {
          if (inputRef) {
            this.inputRefs.set(i, inputRef);
          }
        },
        enabled: !this.props.working
      });
    });
  }

  renderAlert () {
    if (this.props.alert) {
      return (
          <Alert
              {...this.props.alert}
              ref={c => this.alertRef = c}
          />
      )
    }
  }

  componentWillMount () {
    this.inputRefs = new Map();
  }

  render () {
    return(
        <div>
            {this.renderAlert()}
            {this.renderFields()}
            <Button
                onClick={this.handleClick.bind(this)}
                ref={c => this.submitButtonRef = c}
                text={this.props.submitButtonText}
                type={"primary"}
                working={this.props.working}
            />
        </div>
    );
  }
};
