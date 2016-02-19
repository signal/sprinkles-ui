import React from "react";
import loremIpsum from "lorem-ipsum";
import Popover from "../../src/components/Popover";


// Wrapper to contain a Popover and an anchor element
class PopoverWrapper extends React.Component {
  displayName = "PopoverWrapper";

  static propTypes = {
    anchorEl: React.PropTypes.object,
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
        background: "#4285F4",
        color: "#FEFEFE"
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

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A Popver element

  #### API

  - **anchorEl** *React.PropTypes.object* (optional) element to anchor popover (not set for absolute center)
  - **children** *React.PropTypes.node* (optional) child components
  - **open** *React.PropTypes.bool* (optional) popover open state

  `);
});
