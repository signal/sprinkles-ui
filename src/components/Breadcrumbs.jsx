import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import { Map } from "immutable";

export default class Breadcrumbs extends ReactCSS.Component {
  displayName = "Breadcrumbs";
  static propTypes = {
    path: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        display: React.PropTypes.string,
        url: React.PropTypes.string,
      }),
    ),
    onClick: React.PropTypes.func,
  }

  static defaultProps = {
    path: [],
    onClick: () => {},
  }

  handleClick(itemData) {
    this.props.onClick(itemData);
  }

  renderPath() {
    this.pathRefs = new Map();
    return this.props.path.map((item, i) => {
      const divider = i !== this.props.path.length - 1 ? (<Text>{" / "}</Text>) : undefined;
      return (
        <span
          key={i}
          onClick={this.handleClick.bind(this, item)}
          ref={c => {
            this.pathRefs = this.pathRefs.set(i, c);
          }}
        >
          <Text>
            {item.display}
          </Text>
          <span>{divider}</span>
        </span>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderPath()}
      </div>
    );
  }
}
