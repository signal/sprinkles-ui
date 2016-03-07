import React from "react";
import ReactCSS from "reactcss";
import TextInput from "./TextInput";

export default class Field extends ReactCSS.Component {
  displayName = "Field";

  static propTypes = {
    children: React.PropTypes.node,
    initialValue: React.PropTypes.string
  };

  constructor (props) {
    super(props);
    this.state = {
      value: props.initialValue
    };
  }

  linkState () {
    return {
      value: this.state.value,
      requestChange: (newValue) => this.setState({value: newValue})
    }
  }

  renderChildren () {
    return React.Children.map(this.props.children, (child) => {
      switch (child.type) {
        case TextInput:
          return React.cloneElement(child, {
            valueLink: this.linkState()
          });
        default:
          throw new Error("Unknown Child Type")
      }
    });
  }

  render () {
    return (
        <div>
            {this.renderChildren()}
        </div>
    );
  }
};