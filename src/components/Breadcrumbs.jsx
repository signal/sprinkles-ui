import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";

export default class Breadcrumbs extends ReactCSS.Component {
  displayName = "Breadcrumbs";
  static propTypes = {
    path: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        display: React.PropTypes.string,
        url: React.PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    path: [],
  }

  renderPath() {
    return this.props.path.map((item, i) => {
      const divider = i !== this.props.path.length - 1 ? (<Text>{" / "}</Text>) : undefined;
      return (
        <span
          key={i}
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
