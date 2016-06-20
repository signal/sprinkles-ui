import React from 'react';
import reactCSS from 'reactcss';
import color from 'color';
import {
  Colors,
  BackgroundColors,
  StructuralColors,
} from '../shared/colors';

export default class ToggleInput extends React.Component {
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

  displayName = 'ToggleInput';

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

  handleClick() {
    this.setState({
      value: !this.state.value,
    }, () => this.props.onChange(this.state.value));
  }

  render() {
    const style = reactCSS({
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
    }, {
      disabled: !this.props.enabled,
      activated: this.state.value,
      success: this.props.status === 'success',
      warning: this.props.status === 'warning',
      error: this.props.status === 'error',
    });
    return (
      <div
        onClick={this.props.enabled ? this.handleClick.bind(this) : undefined}
        style={style.ToggleInput}
      >
        <div
          ref={(c) => this.switchRef = c}
          style={style.ToggleSwitch}
        />
      </div>
    );
  }
}
