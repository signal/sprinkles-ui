import React from "react";
import ReactCSS from "reactcss";
import colors from "../shared/colors";

export default class AlertMessage extends ReactCSS.Component {
  displayName = "AlertMessage";

  static propTypes = {
    test1: React.PropTypes.string
  };


  render () {
    return (
      <AlertMessage />
    );
  }
};
