import React from "react";
import ReactCSS from "reactcss";
import color from "color";
import {
  Colors,
  BackgroundColors,
  StructuralColors,
} from "../shared/colors";

export default class ToggleInput extends ReactCSS.Component {
  displayName = "ToggleInput";

  static propTypes = {
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.bool,
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    enabled: true,
    initialValue: false,
    onChange: () => {},
  };

  constructor(props) {
    super();
    this.state = {
      value: props.initialValue,
    };
  }

  classes() {
    return {
      default: {
        ToggleInput: {
          border: `1px solid ${StructuralColors.inputBorder}`,
          background: BackgroundColors.primary,
          width: 42,
          height: 26,
          borderRadius: "13px",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s ease",
        },
        ToggleSwitch: {
          background: BackgroundColors.primary,
          boxShadow: "0 1px 2px #888",
          width: 24,
          height: 24,
          borderRadius: "13px",
          position: "absolute",
          top: 1,
          left: 0,
          transition: "left 0.2s ease",
        },
      },
      disabled: {
        ToggleInput: {
          background: BackgroundColors.secondary,
          cursor: "not-allowed",
        },
        ToggleSwitch: {
          background: BackgroundColors.secondary,
        },
      },
      activated: {
        ToggleInput: {
          border: `1px solid ${this.props.enabled ? Colors.success :
            color(Colors.success).lighten(0.4).hexString()}`,
          background: this.props.enabled ? Colors.success :
            color(Colors.success).lighten(0.4).hexString(),
        },
        ToggleSwitch: {
          left: 18,
        },
      },
    };
  }

  styles() {
    return this.css({
      disabled: !this.props.enabled,
      activated: this.state.value,
    });
  }

  handleClick() {
    this.setState({
      value: !this.state.value,
    }, () => this.props.onChange(this.state.value));
  }

  render() {
    return (
      <div
        onClick={this.props.enabled ? this.handleClick.bind(this) : undefined}
        style={this.styles().ToggleInput}
      >
        <div
          ref={(c) => this.switchRef = c}
          style={this.styles().ToggleSwitch}
        />
      </div>
    );
  }
}
