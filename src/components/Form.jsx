import React from "react";
import ReactCSS from "reactcss";
import Button from "./Button";

export default class Form extends ReactCSS.Component {
  displayName = "Form";

  static propTypes = {
    children: React.PropTypes.node,
    onSubmit: React.PropTypes.func
  };

  static defaultProps = {
    onSubmit: () => {}
  };

  constructor() {
    super();
    this.state = {
      isValid: true,
      inputValidations: {}
    }
  }

  handleClick (e) {
    this.validate();
    if (this.state.isValid) {
      this.props.onSubmit();
    }
  }

  handleChange (change, inputRef) {
    let newInputStatuses = {};
    this.inputRefs.forEach((input, i) => {
      newInputStatuses[i] = i === inputRef.props.fieldId ?
                                  true : this.state.inputValidations[i];
    });
    this.setState({
      inputValidations: newInputStatuses
    });
  }

  validate () {
    let newInputStatuses = {};
    let isValid = true;
    this.inputRefs.forEach((input, i) => {
      if (!input.isValid()) {
        isValid = false;
      }
      newInputStatuses[i] = input.isValid();
    });
    this.setState({
      isValid: isValid,
      inputValidations: newInputStatuses
    });
  }

  renderFields () {
    return React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        fieldId: i,
        onChange: this.handleChange.bind(this),
        status: this.state.inputValidations[i] === false ? "error" : undefined,
        ref: (inputRef) => {
          if (inputRef) {
            this.inputRefs.set(i, inputRef);
          }
        }
      });
    });
  }

  componentWillMount () {
    this.inputRefs = new Map();
  }

  render () {
    return(
        <div>
            {this.renderFields()}
            <Button
                onClick={this.handleClick.bind(this)}
                ref={c => this.submitButtonRef = c}
            />
        </div>
    );
  }
};
