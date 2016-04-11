import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import { Colors, TextColors } from "../shared/colors"
import Color from "color";

export default class RadioButtonInput extends ReactCSS.Component {
  displayName = "RadioButtonInput";

  static propTypes = {
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
    onChange: React.PropTypes.func,
    status: React.PropTypes.oneOf(["error", "warning", "success"])
  };

  static defaultProps = {
    enabled: true,
    items: [],
    onChange: () => {}
  };

  constructor(props) {
    super();
    this.state = {
      value: this.initialValue(props)
    };
  }

  initialValue (props) {
    let initialValue = props.initialValue;
    if (!props.initialValue && props.items.length > 0) {
      initialValue = props.items[0].value;
    }
    return initialValue;
  }

  validate () {
    return {
      valid: true,
      isInitialValue: this.value() === this.initialValue(this.props),
      validationError: ""
    }
  }

  value () {
    return this.state.value;
  }

  classes () {
    return {
      "default": {
        RadioItems: {
          cursor: "pointer"
        },
        RadioItem: {
          paddingBottom: 10
        },
        Text: {
          marginLeft: 10
        }
      },
      "disabled": {
        Input: {
          cursor: "not-allowed"
        },
        RadioItems: {
          cursor: "not-allowed"
        }
      }
    };
  }

  styles () {
    return this.css({
      "disabled": !this.props.enabled
    });
  }

  handleClick (newValue) {
    if (this.props.enabled && newValue !== this.value()) {
      this.setState({
        value: newValue
      });
      this.props.onChange(newValue);
    }
  }

  renderItems () {
    this.radioInputRefs = [];
    let textColor;
    switch (this.props.status) {
      case "error":
        textColor = Colors.danger;
        break;
      case "warning":
        textColor = Colors.warning;
        break;
      case "success":
        textColor = Colors.success;
        break;
      default:
        textColor = TextColors.dark;
        break;
    };
    if (!this.props.enabled) {
      const factor = textColor === TextColors.dark ? 0.9 : 0.2;
      textColor = Color(textColor).lighten(factor).hexString();
    }
    return this.props.items.map((item, i) => {
      return(
          <div
              key={i}
              onClick={this.handleClick.bind(this, item.value)}
              ref={(c) => this.radioInputRefs.push(c)}
              style={i === this.props.items.length -1 ? {} : this.styles().RadioItem}
          >
              <input
                  checked={item.value === this.value()}
                  disabled={!this.props.enabled}
                  key={i}
                  name={item.name}
                  onChange={() => {}}
                  style={this.styles().Input}
                  type="radio"
                  value={item.value}
              />
              <span style={this.styles().Text}>
                  <Text
                      color={textColor}
                      fontSize={16}
                  >
                    {item.name}
                  </Text>
              </span>
          </div>
      )
    });
  }

  render () {
    return(
        <div style={this.styles().RadioItems}>
          {this.renderItems()}
        </div>
    );
  }
};
