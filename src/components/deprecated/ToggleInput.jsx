import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import color from 'color';
import Base from '../Base';

export default class ToggleInput extends Base {
  static propTypes = {
    enabled: PropTypes.bool,
    initialValue: PropTypes.bool,
    onChange: PropTypes.func,
    status: PropTypes.oneOf(['error', 'warning', 'success']),
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
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        ToggleInput: {
          border: `1px solid ${clr.formColors.border}`,
          background: clr.backgroundColors.primary,
          width: 42,
          height: 26,
          borderRadius: '13px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        },
        ToggleSwitch: {
          background: clr.backgroundColors.primary,
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
          background: clr.backgroundColors.secondary,
          cursor: 'not-allowed',
        },
        ToggleSwitch: {
          background: clr.backgroundColors.secondary,
        },
      },
      activated: {
        ToggleInput: {
          border: `1px solid ${this.props.enabled ? clr.noticeColors.success :
            color(clr.noticeColors.success).lighten(0.4).hexString()}`,
          background: this.props.enabled ? clr.noticeColors.success :
            color(clr.noticeColors.success).lighten(0.4).hexString(),
        },
        ToggleSwitch: {
          left: 18,
        },
      },
      success: {
        ToggleInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.success}`,
          border: '1px solid transparent',
        },
      },
      warning: {
        ToggleInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.warning}`,
          border: '1px solid transparent',
        },
      },
      error: {
        ToggleInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.danger}`,
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
      <button
        onClick={this.props.enabled ? this.handleClick.bind(this) : undefined}
        style={style.ToggleInput}
      >
        <div
          ref={(c) => this.switchRef = c}
          style={style.ToggleSwitch}
        />
      </button>
    );
  }
}
