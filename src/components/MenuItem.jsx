import React from "react";

export default class MenuItem extends React.Component {

  static propTypes = {
    handleClick: React.PropTypes.func,
    text: React.PropTypes.string,
    style: React.PropTypes.object
  };

  static defaultProps = {
    text: "",
    style: {}
  };

  handleClick = () => {
    if (this.props.handleClick) {
      this.props.handleClick();
    }
  };

  render () {
    return (
      <li style={this.props.style} onClick={ this.handleClick }>
        {this.props.text}
      </li>
    );
  }
}
