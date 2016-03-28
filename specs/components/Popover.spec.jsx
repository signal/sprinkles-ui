import React from "react";
import loremIpsum from "lorem-ipsum";
import Popover from "../../src/components/Popover";
import { Colors } from "../../src/shared/colors"


// Wrapper to contain a Popover and an anchor element
class PopoverWrapper extends React.Component {
  displayName = "PopoverWrapper";

  static propTypes = {
    anchorEl: React.PropTypes.object,
    anchorOrigin: React.PropTypes.object,
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    open: React.PropTypes.bool
  };

  static defaultProps = {
    text: ""
  };

  constructor () {
    super();

    this.style = {
      anchorDiv: {
        padding: 10,
        background: Colors.info,
        color: "#FEFEFE",
        cursor: "pointer"
      }
    };
  }

  handleClick (e) {
    this.props.onClick(e);
  }

  render () {
    return(
        <div>
            <div
                onClick={this.handleClick.bind(this)}
                style={this.style.anchorDiv}
            >
                {"Click Me"}
            </div>
            <Popover
                anchorEl={this.props.anchorEl}
                anchorOrigin={this.props.anchorOrigin}
                open={this.props.open}
            >
                {this.props.children}
            </Popover>
        </div>
    );
  }
}

describe("Popover", function() {
  this.header(`## Popover`); // Markdown.

  before(() => {
    function handleClick(e) {
      this.props({
        anchorEl: e.currentTarget,
        open: true
      })
    }

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <PopoverWrapper
            onClick={handleClick.bind(this)}
        >
            {loremIpsum()}
        </PopoverWrapper>
    );
  });

  it("anchorOrigin h:left, v:bottom", () => this.props({
    anchorOrigin: {
      horizontal: "left",
      vertical: "bottom"
    }
  }));

  it("anchorOrigin h:right, v:bottom", () => this.props({
    anchorOrigin: {
      horizontal: "right",
      vertical: "bottom"
    }
  }));

  it("anchorOrigin h:left, v:top", () => this.props({
    anchorOrigin: {
      horizontal: "left",
      vertical: "top"
    }
  }));

  it("anchorOrigin h:right, v:top", () => this.props({
    anchorOrigin: {
      horizontal: "right",
      vertical: "top"
    }
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A Popver element

  #### API

  - **anchorEl** *React.PropTypes.object* (optional) element to anchor popover (not set for absolute center)
  - **anchorOrigin** *React.PropTypes.object* (optional) point on the anchorEl to anchor against
  - **children** *React.PropTypes.node* (optional) child components
  - **open** *React.PropTypes.bool* (optional) popover open state

  `);
});
