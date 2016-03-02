import React from "react";
import ReactCSS from "reactcss";


export default class TextInput extends ReactCSS.Component {
  displayName = "TextInput";

  static propTypes ={
    handleChange: React.PropTypes.func,
    value: React.PropTypes.string
  };

  static defaultProps = {
    value: ""
  };

  handleChange (e) {
    if (this.props.handleChange) {
      this.props.handleChange(e.target.value);
    }
  }

  render () {
    return (
        <input
            onChange={this.handleChange.bind(this)}
            readOnly={!this.props.handleChange}
            value={this.props.value}
        />
    );
  }
};
