/* eslint react/no-unused-prop-types: "off" */
/* eslint jsx-a11y/no-static-element-interactions: "off" */

import color from 'color';
import React from 'react';
import reactCSS from 'reactcss';
import Base from './Base';
import Text from './Text';

export default class RadioButtonInput extends Base {
  static propTypes = {
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
      })
    ).isRequired,
    onChange: React.PropTypes.func,
    status: React.PropTypes.oneOf(['error', 'warning', 'success']),
  };

  static defaultProps = {
    enabled: true,
    items: [],
    onChange: () => {},
  };

  displayName = 'RadioButtonInput';

  constructor(props) {
    super();
    this.state = {
      value: props.initialValue || props.items[0].value,
    };
  }

  validate() {
    return {
      valid: true,
      isInitialValue: this.value() === (this.props.initialValue || this.props.items[0].value),
      validationError: '',
    };
  }

  value() {
    return this.state.value;
  }

  handleClick(newValue) {
    if (this.props.enabled && newValue !== this.value()) {
      this.setState({
        value: newValue,
      }, () => this.props.onChange(this.value()));
    }
  }

  renderItems(clr, style) {
    this.radioInputRefs = [];
    let textColor;
    switch (this.props.status) {
      case 'error':
        textColor = clr.noticeColors.danger;
        break;
      case 'warning':
        textColor = clr.noticeColors.warning;
        break;
      case 'success':
        textColor = clr.noticeColors.success;
        break;
      default:
        textColor = clr.textColors.primary;
        break;
    }
    if (!this.props.enabled) {
      const factor = textColor === clr.textColors.primary ? 0.9 : 0.2;
      textColor = color(textColor).lighten(factor).hexString();
    }
    return this.props.items.map((item, i) => (
      <div
        key={i}
        onClick={this.handleClick.bind(this, item.value)}
        ref={(c) => this.radioInputRefs.push(c)}
        style={i === this.props.items.length - 1 ? {} : style.RadioItem}
      >
        <input
          checked={item.value === this.value()}
          disabled={!this.props.enabled}
          key={i}
          name={item.name}
          onChange={() => {}}
          style={style.Input}
          type={'radio'}
          value={item.value}
        />
        <span style={style.Text}>
          <Text
            color={textColor}
            fontSize={1}
          >
            {item.name}
          </Text>
        </span>
      </div>
      )
    );
  }

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        RadioItems: {
          color: clr.formColors.text,
          cursor: 'pointer',
        },
        RadioItem: {
          paddingBottom: 10,
        },
        Text: {
          marginLeft: 10,
        },
      },
      disabled: {
        Input: {
          cursor: 'not-allowed',
        },
        RadioItems: {
          cursor: 'not-allowed',
        },
      },
    }, {
      disabled: !this.props.enabled,
    });
    return (
      <div style={style.RadioItems}>
        {this.renderItems(clr, style)}
      </div>
    );
  }
}
