/* eslint react/forbid-prop-types: "off" */
/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Base from './Base';
import Text from './Text';

export default class Field extends Base {
  static propTypes = {
    children: PropTypes.node,
    enabled: PropTypes.bool,
    error: PropTypes.string,
    fieldKey: PropTypes.string.isRequired,
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(['left', 'top']),
    onChange: PropTypes.func,
    required: PropTypes.bool,
    requriedAsteriskDisplay: PropTypes.bool,
    status: PropTypes.oneOf(['error', 'warning', 'success']),
    style: PropTypes.object,
  };

  static defaultProps = {
    enabled: true,
    fieldKey: 'defaultKey',
    labelPosition: 'top',
    onChange: () => {},
    required: false,
    requriedAsteriskDisplay: true,
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
      }),
    );
  }

  renderLabel(clr) {
    if (this.props.label) {
      let labelColor;
      switch (this.props.status) {
        case 'error':
          labelColor = clr.noticeColors.danger;
          break;
        case 'warning':
          labelColor = clr.noticeColors.warning;
          break;
        case 'success':
          labelColor = clr.noticeColors.success;
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

  renderError(clr, style) {
    if (this.props.error) {
      return (
        <div style={style.Error}>
          <Text
            color={clr.noticeColors.danger}
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

  renderRequired(clr) {
    if (this.props.required && this.props.requriedAsteriskDisplay) {
      return (
        <span>
          {' '}
          <Text
            color={clr.noticeColors.danger}
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
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        Label: {
          color: clr.formColors.label,
          fontWeight: 700,
          marginBottom: 5,
        },
        Error: {
          marginTop: 5,
        },
      },
      haveLabel: {
        Label: {
        },
      },
      disabled: {
        Label: {
          color: clr.textColors.secondary,
        },
      },
      labelPosition: {
        Error: {
          marginLeft: '25%',
          width: '100%',
        },
        Field: {
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
        },
        Label: {
          paddingRight: '2%',
          width: '23%',
        },
        inputWrapper: {
          flex: 1,
          width: '75%',
        },
      },
    }, {
      disabled: !this.props.enabled,
      haveLabel: !!this.props.label || this.props.required,
      labelPosition: this.props.labelPosition === 'left',
    });
    const fieldStyle = Object.assign({}, style.Field, this.props.style);
    return (
      <div style={fieldStyle}>
        <div style={style.Label}>
          {this.renderLabel(clr)}{this.renderRequired(clr)}
        </div>
        <div style={style.inputWrapper}>
          {this.renderInput()}
        </div>
        {this.renderError(clr, style)}
      </div>
    );
  }
}
