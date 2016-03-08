import React from "react";
import loremIpsum from "lorem-ipsum";
import TextInput from "../../src/components/TextInput";

// Wrap the TextInput with a component. The wrapper
// keeps track of the value in state.
// TextInput and wrapper are kept in sync with Two-Way Binding
// https://facebook.github.io/react/docs/two-way-binding-helpers.html
class TextInputWrapper extends React.Component {
  displayName = "TextInputWrapper"

  static propTypes = {
    placeholder: React.PropTypes.string,
    status: React.PropTypes.string
  };

  static defaultProps = {
    placeholder: "Placeholder"
  };

  constructor() {
    super();
    this.state = {
      value: "some default value"
    };
  }

  render () {
    return(
        <TextInput
            placeholder={this.props.placeholder}
            status={this.props.status}
            valueLink={{
              value: this.state.value,
              requestChange: (newValue) => this.setState({value: newValue})
            }}
        />
    );
  }
}


describe("TextInput", function() {
  this.header(`## TextInput`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <TextInputWrapper />
    ).width("100%");
  });

  // Since two-way binding is implemented changing the state of the wrapper
  // will also update the DOM.
  it("Update value", () => UIHarness.component.setState({value: loremIpsum()}));
  it("Clear value", () => UIHarness.component.setState({value: ""}));
  it("Update placeholder", () => this.props({placeholder: loremIpsum()}));
  it("Clear placeholder", () => this.props({placeholder: "Placeholder"}));
  it("Set Success Status", () => this.props({status: "success"}));
  it("Set Warning Status", () => this.props({status: "warning"}));
  it("Set Error Status", () => this.props({status: "error"}));
  it("Clear Status", () => this.props({status: undefined}));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  An TextInput Element

  #### API

  - **placeholder** *React.PropTypes.string* (optional) placeholder when text is empty
  - **status** *React.PropTypes.oneOf* (optional) set status of text box (overrides focus). Acceptable values are 'error', 'warning' and 'success'
  - **valueLink** *React.PropTypes.shape* (optional) an object that enables [two-way binding](https://facebook.github.io/react/docs/two-way-binding-helpers.html)
    - **value** *React.PropTypes.string* (required - if valueLink is set) text value
    - **requestChange** *React.PropTypes.func* (optional) called with new value if value changes

  `);
});
