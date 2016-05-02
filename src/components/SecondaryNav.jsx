import React from "react";
import ReactCSS from "reactcss";

export default class SecondaryNav extends ReactCSS.Component {
  displayName = "SecondaryNav";

  static propTypes = {
    leftItems: React.PropTypes.node,
  }

  classes() {
    return {
      default: {
        LeftItems: {
          display: "flex",
        },
      },
    };
  }

  renderLeftItems() {
    if (this.props.leftItems) {
      return (
        <div
          style={this.styles().LeftItems}
          ref={c => this.leftItemsRef = c}
        >
          { this.props.leftItems }
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderLeftItems()}
      </div>
    );
  }
}
