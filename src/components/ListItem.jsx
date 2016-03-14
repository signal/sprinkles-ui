import React from "react";
import ReactCSS from "reactcss";

export default class ListItem extends ReactCSS.Component {
  displayName = "ListItem";

  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    padding: React.PropTypes.string,
    selected: React.PropTypes.bool,
    showHoverEffect: React.PropTypes.bool
  };

  static defaultProps = {
    padding: "10px",
    selected: false,
    showHoverEffect: true
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
          padding: this.props.padding
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
            onMouseOut={this.props.showHoverEffect ? this.handleMouseOut.bind(this) : null}
            onMouseOver={this.props.showHoverEffect ? this.handleMouseOver.bind(this) : null}
            style={this.styles().ListItem}
        >
          {this.props.children}
        </div>
    );
  }
}
