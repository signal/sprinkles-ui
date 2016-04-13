/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from "react";
import loremIpsum from "lorem-ipsum";
import List from "../../src/components/List";
import ListItem from "../../src/components/ListItem";
import Text from "../../src/components/Text";


describe("List", function () {
  this.header(`
  ## List
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
      <List onClick={() => console.log("List clicked")}>
        <ListItem>
          <Text fontSize={16}>{loremIpsum()}</Text>
        </ListItem>
        <ListItem>
          <Text fontSize={16}>{loremIpsum()}</Text>
        </ListItem>
      </List>
    );
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### List

  A List that contains child nodes

  #### API

  - **children** *React.PropTypes.node* (optional) child components
  - **onClick** *React.PropTypes.func* (optional) click hander function

  `);
});
