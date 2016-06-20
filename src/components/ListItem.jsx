import React from 'react';

export default class ListItem extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    listPosition: React.PropTypes.oneOf(['first', 'middle', 'last']),
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
  };

  displayName = 'ListItem';

  constructor() {
    super();
    this.state = {
      isHovering: false,
    };
  }

  handleMouseOut() {
    this.setState({ isHovering: false });
  }

  handleMouseOver() {
    this.setState({ isHovering: true });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child) {
        return React.cloneElement(child, {
          hovered: this.state.isHovering,
          listPosition: this.props.listPosition,
          ref: c => this.listItemRef = c,
          selected: this.props.selected,
        });
      }
      return undefined;
    });
  }

  render() {
    return (
      <div
        onClick={this.props.onClick}
        onMouseOut={this.handleMouseOut.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
      >
        {this.renderChildren()}
      </div>
    );
  }
}
