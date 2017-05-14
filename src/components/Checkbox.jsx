import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    enabled: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    checked: false,
    enabled: true,
    onClick: () => {},
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
  };

  displayName = 'Checkbox';

  constructor() {
    super();
    this.state = {
      checked: false,
      focus: false,
    };
  }

  handleChange = (e) => {
    this.setState({ checked: e.target.checked });
    this.props.onChange(e);
  }

  handleFocus = (e) => {
    this.setState({ focus: true });
    this.props.onFocus(e);
  };

  handleBlur = (e) => {
    this.setState({ focus: false });
    this.props.onBlur(e);
  };

  renderCheckBox(style) {
    const props = {
      ref: c => this.inputRef = c,
      checked: this.props.checked,
      disabled: !this.props.enabled,
      onBlur: this.handleBlur.bind(this),
      onChange: this.handleChange.bind(this),
      onClick: this.props.onClick,
      onFocus: this.handleFocus.bind(this),
      type: 'checkbox',
    };
    return (
      <input style={style.Checkbox} {...props} />
    );
  }

  render() {
    const style = reactCSS({
      default: {
        Checkbox: {
          margin: 0,
        },
      },
    });

    return (
      this.renderCheckBox(style)
    );
  }
}
