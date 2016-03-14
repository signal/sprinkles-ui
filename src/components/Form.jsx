import React from "react";
import ReactCSS from "reactcss";
import Button from "./Button"

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
      isValid: true
    }
  }

  handleClick (e) {
    if (this.state.isValid) {
      this.props.onSubmit();
    }
  }

  renderFields () {
    return React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        ref: (inputRef) =>{
          if (inputRef) {
            this.inputs.add(inputRef);
          }
        }
      });
    });
  }

  componentWillMount () {
    this.inputs = new Set();
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
