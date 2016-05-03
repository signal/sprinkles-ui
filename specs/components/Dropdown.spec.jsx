/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from "react";
import Dropdown from "../../src/components/Dropdown";
import { Colors } from "../../src/shared/colors";

class DropdownWrapper extends React.Component {
  static propTypes = {
    anchorEl: React.PropTypes.object,
    anchorOrigin: React.PropTypes.object,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
    onAnchorClick: React.PropTypes.func,
    onClick: React.PropTypes.func,
    open: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    useLayerForClickAway: React.PropTypes.bool,
  };

  displayName = "DropdownWrapper";

  constructor() {
    super();

    this.style = {
      anchorDiv: {
        padding: 10,
        background: Colors.info,
        color: "#FEFEFE",
        cursor: "pointer",
      },
    };
  }

  handleClick(e) {
    this.props.onAnchorClick(e);
  }

  render() {
    return (
      <div>
        <div
          onClick={this.handleClick.bind(this)}
          style={this.style.anchorDiv}
        >
          {"Dropdown"}
        </div>
        <Dropdown
          anchorEl={this.props.anchorEl}
          anchorOrigin={this.props.anchorOrigin}
          open={this.props.open}
          items={this.props.items}
          onClick={this.props.onClick}
          onRequestClose={this.props.onRequestClose}
          useLayerForClickAway={this.props.useLayerForClickAway}
        />
      </div>
    );
  }
}

describe("Dropdown", function () {
  this.header(`
  ## Dropdown
  `); // Markdown.

  before(() => {
    const handleAnchorClick = (e) => {
      this.props({
        anchorEl: e.currentTarget,
        open: true,
      });
    };
    const handleClick = (item) => {
      console.log("Item Clicked", item);
      this.props({
        open: false,
      });
    };
    const handleRequestClose = () => this.props({ open: false });
    this.load(
      <DropdownWrapper
        items={[
          {
            key: "thing1",
            value: "Thing 1",
          },
          {
            key: "thing2",
            value: "Thing 2",
          },
        ]}
        open={false}
        onClick={handleClick}
        onAnchorClick={handleAnchorClick}
        onRequestClose={handleRequestClose}
        useLayerForClickAway={true}
      />
    );
  });

  it("Open Dropdown", () => this.props({ open: true }));
  it("Close Dropdown", () => this.props({ open: false }));
  it("anchorOrigin h:left, v:bottom", () => this.props({
    anchorOrigin: {
      horizontal: "left",
      vertical: "bottom",
    },
  }));

  it("anchorOrigin h:right, v:bottom", () => this.props({
    anchorOrigin: {
      horizontal: "right",
      vertical: "bottom",
    },
  }));

  it("anchorOrigin h:left, v:top", () => this.props({
    anchorOrigin: {
      horizontal: "left",
      vertical: "top",
    },
  }));

  it("anchorOrigin h:right, v:top", () => this.props({
    anchorOrigin: {
      horizontal: "right",
      vertical: "top",
    },
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Dropdown

  A dropdown component

  #### API

  - coming soon

  `);
});
