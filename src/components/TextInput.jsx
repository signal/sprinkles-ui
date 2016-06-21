import React from 'react';
import reactCSS from 'reactcss';
import {
  Colors,
  TextColors,
  StructuralColors,
} from '../shared/colors';


export default class TextInput extends React.Component {
  static propTypes = {
    autoComplete: React.PropTypes.bool,
    boundValue: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    multiline: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    status: React.PropTypes.oneOf(['error', 'warning', 'success']),
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
    return reactCSS({
      default: {
        TextInput: {
          fontSize: '0.875rem',
          padding: '0.5rem',
          width: '100%',
          border: `1px solid ${StructuralColors.inputBorder}`,
          borderRadius: 3,
          outline: 'none',
          color: TextColors.primary,
        },
      },
      focus: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${Colors.info}`,
        },
      },
      success: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${Colors.success}`,
        },
      },
      warning: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${Colors.warning}`,
        },
      },
      error: {
        TextInput: {
          boxShadow: `0 0 3px 1px ${Colors.danger}`,
        },
      },
      disabled: {
        TextInput: {
          color: TextColors.secondary,
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
