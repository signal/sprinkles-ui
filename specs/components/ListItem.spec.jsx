import React from "react";
import loremIpsum from "lorem-ipsum";
import ListItem from "../../src/components/ListItem";
import Text from "../../src/components/Text";


describe("ListItem", function() {
  this.header(`## ListItem`); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <ListItem onClick={() => console.log("ListItem clicked")}>
            <Text fontSize={16}>{loremIpsum()}</Text>
        </ListItem>
    );
  });

  it("Select ListItem", () => this.props({selected: true}));
  it("Unselect ListItem", () => this.props({selected: false}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### ListItem

  A component for rendering an individual list item.

  #### API

  - **children** *React.PropTypes.node* (optional) child components or text nodes
  - **onClick** *React.PropTypes.func* (optional) click hander function
  - **padding** *React.PropTypes.string* (optional) specify padding for additional spacing options
  - **selected** *React.PropTypes.bool* (optional) selection state
  - **showHoverEffect** *React.PropTypes.bool* (defaults to true) changes background when user hovers

  `);
});
