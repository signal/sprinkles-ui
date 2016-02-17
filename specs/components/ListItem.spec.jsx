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
            <Text>{loremIpsum()}</Text>
        </ListItem>
    );
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### ListItem

  A component for rendering an individual list item.

  #### API

  - coming soon!
  `);
});
