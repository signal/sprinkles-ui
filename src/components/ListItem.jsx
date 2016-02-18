import React from "react";
import ReactCSS from "reactcss";

export default class ListItem extends ReactCSS.Component {
  displayName = "ListItem";

  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  constructor() {
    super();

    this.state = {
      isHovering: false
    };
  }

  handleMouseOut () {
    this.setState({isHovering: false});
  }

  handleMouseOver () {
    this.setState({isHovering: true});
  }

  classes () {
    return {
      "default": {
        ListItem: {
          padding: 10
        }
      },
      "hovering": {
        ListItem: {
          background: "#EEEEEE",
        }
      },
      "selected": {
        ListItem: {
          background: "#4285F4",
          color: "#FEFEFE"
        }
      }
    };
  }

  styles () {
    return this.css({
      "hovering": this.state.isHovering && !this.props.selected,
      "selected": this.props.selected
    });
  }

  render () {
    return (
        <div
            onClick={this.props.onClick}
            onMouseOut={this.handleMouseOut.bind(this)}
            onMouseOver={this.handleMouseOver.bind(this)}
            style={this.styles().ListItem}
        >
          {this.props.children}
        </div>
    );
  }
}
