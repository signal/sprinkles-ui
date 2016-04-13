import React from "react";


/**
 * Dummy component.For reference
 */
export default class MyComponent extends React.Component {
  static displayName = "MyComponent";

  static propTypes = {
    color: React.PropTypes.oneOf(["red", "green", "blue"]),
  };

  static defaultProps = {
    color: "blue",
  };

  render() {
    let style = {
      background: this.props.color,
      color: "white",
      padding: 40,
    };

    return (
        <div style={style} >
          {"MyComponent"}
        </div>
    );
  }
}
