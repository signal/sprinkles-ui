import React from "react";
import ReactCSS from "reactcss";
import Button from "./Button"

export default class Form extends ReactCSS.Component {
  displayName = "Form";

  render () {
    return(
        <div>
            <Button
                ref={c => this.submitButtonRef = c}
            />
        </div>
    );
  }
};
