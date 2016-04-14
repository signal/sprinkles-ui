import React from "react";
import ReactCSS from "reactcss";
import { Map } from "immutable";

export default class ButtonGroup extends ReactCSS.Component {
  displayName = "ButtonGroup";

  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {},
  };

  handleClick(buttonKey) {
    this.props.onClick(buttonKey);
  }

  renderButtons() {
    this.buttonRefs = new Map();
    return React.Children.map(this.props.children, (child) => {
      if (child) {
        if (!child.props.buttonKey) {
          throw new Error("Button missing buttonKey prop");
        }
        return React.cloneElement(child, {
          onClick: this.handleClick.bind(this, child.props.buttonKey),
          ref: (buttonRef) => {
            if (buttonRef) {
              if (!!this.buttonRefs.get(child.props.buttonKey)) {
                throw new Error(`buttonKey prop "${child.props.buttonKey}" is not unique`);
              }
              this.buttonRefs = this.buttonRefs.set(child.props.buttonKey, buttonRef);
            }
          },
        });
      }
      return undefined;
    });
  }

  render() {
    return (
      <span>
        {this.renderButtons()}
      </span>
    );
  }
}
