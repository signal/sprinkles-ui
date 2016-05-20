import React from "react";
import ReactCSS from "reactcss";
import {
  Colors,
  BackgroundColors,
  StructuralColors,
} from "../shared/colors";

export default class ToggleInput extends ReactCSS.Component {
  displayName = "ToggleInput";

  static propTypes = {
    initialValue: React.PropTypes.bool,
  };

  static defaultProps = {
    initialValue: false,
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
          width: 52,
          height: 26,
          borderRadius: "13px",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s ease",
        },
        ToggleSwitch: {
          border: `1px solid ${StructuralColors.inputBorder}`,
          background: BackgroundColors.primary,
          width: 26,
          height: 26,
          borderRadius: "13px",
          position: "absolute",
          top: -1,
          left: -1,
          transition: "left 0.2s ease",
        },
      },
      activated: {
        ToggleInput: {
          background: Colors.success,
        },
        ToggleSwitch: {
          left: 26,
        },
      },
    };
  }

  styles() {
    return this.css({
      activated: this.state.value,
    });
  }

  handleClick() {
    this.setState({
      value: !this.state.value,
    });
  }

  render() {
    return (
      <div
        onClick={this.handleClick.bind(this)}
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
