import React from 'react';
import ReactCSS from 'reactcss';
import color from 'color';
import {
  Colors,
  BackgroundColors,
  StructuralColors,
} from '../shared/colors';

export default class ToggleInput extends ReactCSS.Component {
  displayName = 'ToggleInput';

  static propTypes = {
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    status: React.PropTypes.oneOf(['error', 'warning', 'success']),
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

  value() {
    return this.state.value;
  }

  validate() {
    return {
      valid: true,
      isInitialValue: this.value() === this.props.initialValue,
      validationError: '',
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
          borderRadius: '13px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        },
        ToggleSwitch: {
          background: BackgroundColors.primary,
          boxShadow: '0 1px 2px #888',
          width: 24,
          height: 24,
          borderRadius: '13px',
          position: 'absolute',
          top: 1,
          left: 0,
          transition: 'left 0.2s ease',
        },
      },
      disabled: {
        ToggleInput: {
          background: BackgroundColors.secondary,
          cursor: 'not-allowed',
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
      success: {
        ToggleInput: {
          boxShadow: `0 0 3px 1px ${Colors.success}`,
          border: '1px solid transparent',
        },
      },
      warning: {
        ToggleInput: {
          boxShadow: `0 0 3px 1px ${Colors.warning}`,
          border: '1px solid transparent',
        },
      },
      error: {
        ToggleInput: {
          boxShadow: `0 0 3px 1px ${Colors.danger}`,
          border: '1px solid transparent',
        },
      },
    };
  }

  styles() {
    return this.css({
      disabled: !this.props.enabled,
      activated: this.state.value,
      success: this.props.status === 'success',
      warning: this.props.status === 'warning',
      error: this.props.status === 'error',
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
