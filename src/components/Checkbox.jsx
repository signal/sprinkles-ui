import React from 'react';

export default class Checkbox extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    enabled: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
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

  renderCheckBox() {
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
      <input {...props} />
    );
  }

  render() {
    return (
      this.renderCheckBox()
    );
  }
}
