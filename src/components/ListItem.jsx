import React from "react";

export default class ListItem extends React.Component {
  displayName = "ListItem";

  static propTypes = {
    handleClick: React.PropTypes.func,
    style: React.PropTypes.object,
    text: React.PropTypes.string
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
        <li
            onClick={this.handleClick}
            style={this.props.style}
        >
          {this.props.text}
        </li>
    );
  }
}
