import React from "react";
import ReactCSS from "reactcss";
import TextInput from "./TextInput";
import Text from "./Text";


export default class Field extends ReactCSS.Component {
  displayName = "Field";

  static propTypes = {
    children: React.PropTypes.node,
    initialValue: React.PropTypes.string,
    label: React.PropTypes.string
  };

  constructor (props) {
    super(props);
    this.state = {
      value: props.initialValue
    };
  }

  classes () {
    return {
      "default": {
        Label: {
          margin: "10px 0"
        }
      }
    };
  }

  linkState () {
    return {
      value: this.state.value,
      requestChange: (newValue) => this.setState({value: newValue})
    }
  }

  renderInput () {
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

  renderLabel () {
    if (this.props.label) {
      return (
          <div style={this.styles().Label}>
              <Text
                  fontSize={18}
              >
                  {this.props.label}
              </Text>
          </div>
      );
    }
  }

  render () {
    return (
        <div>
            {this.renderLabel()}
            {this.renderInput()}
        </div>
    );
  }
};
