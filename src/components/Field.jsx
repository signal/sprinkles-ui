import React from 'react';
import reactCSS from 'reactcss';
import Text from './Text';
import { Colors, TextColors } from '../shared/colors';


export default class Field extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    enabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    fieldKey: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    status: React.PropTypes.oneOf(['error', 'warning', 'success']),
    style: React.PropTypes.object,
  };

  static defaultProps = {
    enabled: true,
    fieldKey: 'defaultKey',
    onChange: () => {},
    required: false,
    style: {},
  };

  displayName = 'Field';

  handleChange(change) {
    this.props.onChange(change, this);
  }

  validate() {
    const validation = this.inputRef && this.inputRef.validate ? this.inputRef.validate() : {
      valid: true,
      isInitialValue: true,
    };
    return {
      valid: validation.valid,
      required: this.props.required,
      isInitialValue: validation.isInitialValue,
      validationError: validation.validationError || '',
    };
  }

  renderInput() {
    return React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        enabled: this.props.enabled,
        onChange: this.handleChange.bind(this),
        ref: childRef => this.inputRef = childRef,
        status: this.props.status,
      })
    );
  }

  renderLabel() {
    if (this.props.label) {
      let labelColor;
      switch (this.props.status) {
        case 'error':
          labelColor = Colors.danger;
          break;
        case 'warning':
          labelColor = Colors.warning;
          break;
        case 'success':
          labelColor = Colors.success;
          break;
        default:
          break;
      }
      return (
        <Text
          color={labelColor}
          fontSize={0.875}
          ref={c => this.labelRef = c}
        >
          {this.props.label}
        </Text>
      );
    }
    return null;
  }

  renderError(style) {
    if (this.props.error) {
      return (
        <div style={style.Error}>
          <Text
            color={Colors.danger}
            fontSize={0.875}
            ref={c => this.errorRef = c}
          >
            {this.props.error}
          </Text>
        </div>
      );
    }
    return null;
  }

  renderRequired() {
    if (this.props.required) {
      return (
        <span>
          {' '}
          <Text
            color={Colors.danger}
            fontSize={0.875}
            ref={c => this.requiredRef = c}
          >
            {'*'}
          </Text>
        </span>
      );
    }
    return null;
  }

  render() {
    const style = reactCSS({
      default: {
        Label: {
          color: TextColors.primary,
        },
        Error: {
        },
      },
      haveLabel: {
        Label: {
        },
      },
      disabled: {
        Label: {
          color: TextColors.secondary,
        },
      },
    }, {
      disabled: !this.props.enabled,
      haveLabel: !!this.props.label || this.props.required,
    });
    return (
      <div style={this.props.style}>
        <div style={style.Label}>
          {this.renderLabel()}{this.renderRequired()}
        </div>
        {this.renderInput()}
        {this.renderError(style)}
      </div>
    );
  }
}
