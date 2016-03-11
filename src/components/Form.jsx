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

  handleClick (e) {
    if (this.isValid()) {
      this.props.onSubmit();
    }
  }

  isValid () {
    return true;
  }

  render () {
    return(
        <div>
            <Button
                onClick={this.handleClick.bind(this)}
                ref={c => this.submitButtonRef = c}
            />
        </div>
    );
  }
};
