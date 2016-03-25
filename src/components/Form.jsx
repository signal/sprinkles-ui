import React from "react";
import ReactCSS from "reactcss";
import Button from "./Button";
import AlertMessage from "./AlertMessage";

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
    onSubmit: React.PropTypes.func,
    submitButtonText: React.PropTypes.string
  };

  static defaultProps = {
    onSubmit: () => {},
    submitButtonText: "Submit"
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

  handleClick (e) {
    if (this.validate()) {
      let submitData = {};
      this.inputRefs.forEach((input) => {
        submitData[input.props.fieldKey] = input.inputRef.state.value;
      });
      this.props.onSubmit(submitData);
    }
  }

  handleChange (change, inputRef) {
    if (!Object.keys(this.state.inputValidations).length) {
      return;
    }
    let newInputStatuses = {};
    this.inputRefs.forEach((input, i) => {
      let valid = this.state.inputValidations[i].valid;
      let validationError = this.state.inputValidations[i].validationError;
      if (i === inputRef.props.fieldId) {
        valid = true;
        validationError = "";
      }
      newInputStatuses[i] = {
        valid: valid,
        validationError: validationError
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
        }
      });
    });
  }

  renderAlertMessage () {
    if (this.props.alert) {
      return (
          <AlertMessage
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
            {this.renderAlertMessage()}
            {this.renderFields()}
            <Button
                onClick={this.handleClick.bind(this)}
                ref={c => this.submitButtonRef = c}
                text={this.props.submitButtonText}
            />
        </div>
    );
  }
};
