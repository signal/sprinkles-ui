import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Base from './Base';


export default class TextInput extends Base {
  static propTypes = {
    autoComplete: PropTypes.bool,
    boundValue: PropTypes.string,
    enabled: PropTypes.bool,
    initialValue: PropTypes.string,
    multiline: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    status: PropTypes.oneOf(['error', 'warning', 'success']),
  };

  static defaultProps = {
    autoComplete: true,
    enabled: true,
    multiline: false,
    initialValue: '',
    onChange: () => {},
  };

  displayName = 'TextInput';

  constructor(props) {
    super();
    this.state = {
      isFocused: false,
      value: props.initialValue,
    };
  }

  validate() {
    const isEmpty = this.value() === '';
    const isInitialValue = this.value() === this.props.initialValue;
    return {
      valid: !isEmpty,
      isInitialValue,
      validationError: !isEmpty ? '' : 'Field Must Not Be Empty',
    };
  }

  value() {
    return this.state.value;
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleChange(changeEvent) {
    const value = changeEvent.target.value;
    if (!this.isBound()) {
      this.setState({ value }, () => this.props.onChange(value));
    } else {
      this.props.onChange(value);
    }
  }

  isBound() {
    return this.props.boundValue !== undefined;
  }

  style() {
    const clr = this.getColors();
    return reactCSS({
      default: {
        TextInput: {
          fontSize: '0.875rem',
          padding: '0.5rem',
          width: '100%',
          border: `1px solid ${clr.formColors.border}`,
          borderRadius: 3,
          outline: 'none',
          color: clr.formColors.text,
        },
      },
      focus: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.info}`,
        },
      },
      success: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.success}`,
        },
      },
      warning: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.warning}`,
        },
      },
      error: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.danger}`,
        },
      },
      disabled: {
        TextInput: {
          color: clr.textColors.secondary,
          cursor: 'not-allowed',
        },
      },
    }, {
      focus: this.state.isFocused,
      success: this.props.status === 'success',
      warning: this.props.status === 'warning',
      error: this.props.status === 'error',
      disabled: !this.props.enabled,
    });
  }

  render() {
    const props = {
      autoComplete: this.props.autoComplete ? 'on' : 'off',
      disabled: this.props.enabled ? undefined : 'disabled',
      onBlur: this.handleBlur.bind(this),
      onChange: this.handleChange.bind(this),
      onFocus: this.handleFocus.bind(this),
      placeholder: this.props.placeholder,
      style: this.style().TextInput,
      value: this.isBound() ? this.props.boundValue : this.state.value,
      ref: (comp) => this.inputRef = comp,
    };
    if (this.props.multiline) {
      return (
        <textarea {...props} />
      );
    }
    return (
      <input {...props} />
    );
  }
}
