import React from "react";
import loremIpsum from "lorem-ipsum";
import Popover from "../../src/components/Popover";


// Wrapper to contain a Popover and an anchor element
class PopoverWrapper extends React.Component {
  displayName = "PopoverWrapper";

  static propTypes = {
      open: React.PropTypes.bool,
      text: React.PropTypes.string
  };

  static defaultProps = {
    open: false,
    text: ""
  };

  constructor () {
    super();

    this.style = {
      anchorDiv: {
        padding: 10,
        background: "#4285F4",
        color: "#FEFEFE"
      }
    }
  }

  handleClick (e) {
    console.log("click");
  }

  render () {
    return(
        <div>
            <div
                onClick={this.handleClick}
                style={this.style.anchorDiv}
            >
                {"Click Me"}
            </div>
            <Popover
                open={this.props.open}
            >
                {this.props.text}
            </Popover>
        </div>
    );
  }
}

describe("Popover", function() {
  this.header(`## Popover`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <PopoverWrapper
            text={loremIpsum()}
        />
    );
  });

  it("Close Popver", () => this.props({open: false}));
  it("Open Popver", () => this.props({open: true}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A Popver element

  #### API

  - **children** *React.PropTypes.node* (optional) child components

  `);
});
