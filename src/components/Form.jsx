import React from "react";
import ReactCSS from "reactcss";
import Button from "./Button";
import Alert from "./Alert";
import { Map } from "immutable";

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
      inputValidations: Map()
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

  value () {
    let submitData = {};
    this.inputRefs.forEach((input) => {
      submitData[input.props.fieldKey] = input.inputRef.value();
    });
    return submitData;
  }

  handleClick (e) {
    if (this.validate()) {
      this.props.onSubmit(this.value());
    }
  }

  handleChange (change, inputRef) {
    this.props.onChange(this.value());
    this.setState({
      inputValidations: this.state.inputValidations.set(
        inputRef.props.fieldKey,
        Map({
          valid: true,
          validationError: ""
        })
      )
    });
  }

  validate () {
    let newInputValidations = this.state.inputValidations;
    let formIsValid = true;
    this.inputRefs.forEach((input) => {
      const validation = input.validate();
      const inputIsValid = !validation.required || validation.valid;
      if (!inputIsValid) {
        formIsValid = false;
      }

      newInputValidations = newInputValidations.set(input.props.fieldKey, Map({
        valid: inputIsValid,
        validationError: inputIsValid ? "" : validation.validationError
      }));
    });
    this.setState({
      inputValidations: newInputValidations
    });
    return formIsValid;
  }

  invalidateFields (invalidFields) {
    let newInputValidations = this.state.inputValidations;
    invalidFields.forEach((invalidation) => {
      if (this.inputRefs.get(invalidation.fieldKey)) {
        newInputValidations = newInputValidations.set(invalidation.fieldKey, Map({
          valid: false,
          validationError: invalidation.validationError
        }));
      }
    });
    if (newInputValidations != this.state.inputValidations) {
      this.setState({
        inputValidations: newInputValidations
      });
    }
  }

  renderFields () {
    this.inputRefs = Map();
    return React.Children.map(this.props.children, (child) => {
      if (child) {
        const inputValidation = this.state.inputValidations.get(child.props.fieldKey) || Map();
        return React.cloneElement(child, {
          onChange: this.handleChange.bind(this),
          status: inputValidation.get("valid") === false ? "error" : undefined,
          error: inputValidation.get("validationError"),
          style: this.styles().Field,
          ref: (inputRef) => {
            if (inputRef) {
              this.inputRefs = this.inputRefs.set(child.props.fieldKey, inputRef);
            }
          },
          enabled: !this.props.working
        });
      }
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
