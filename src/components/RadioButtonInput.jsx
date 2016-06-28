import React from 'react';
import reactCSS from 'reactcss';
import Text from './Text';
import { Colors, FormColors, TextColors } from '../shared/colors';
import color from 'color';

export default class RadioButtonInput extends React.Component {
  static propTypes = {
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
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
      value: this.initialValue(props),
    };
  }

  initialValue(props) {
    let initialValue = props.initialValue;
    if (!props.initialValue && props.items.length > 0) {
      initialValue = props.items[0].value;
    }
    return initialValue;
  }

  validate() {
    return {
      valid: true,
      isInitialValue: this.value() === this.initialValue(this.props),
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

  renderItems(style) {
    this.radioInputRefs = [];
    let textColor;
    switch (this.props.status) {
      case 'error':
        textColor = Colors.danger;
        break;
      case 'warning':
        textColor = Colors.warning;
        break;
      case 'success':
        textColor = Colors.success;
        break;
      default:
        textColor = TextColors.primary;
        break;
    }
    if (!this.props.enabled) {
      const factor = textColor === TextColors.primary ? 0.9 : 0.2;
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
    const style = reactCSS({
      default: {
        RadioItems: {
          color: FormColors.text,
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
        {this.renderItems(style)}
      </div>
    );
  }
}
