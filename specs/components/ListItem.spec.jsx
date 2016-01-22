import React from "react";
import loremIpsum from "lorem-ipsum";
import ListItem from "../../src/components/ListItem";


describe("ListItem", function() {
  this.header(`## ListItem`); // Markdown.

  before(() => {
    this.colors = ["black", "white", "blue", "red", "green", "orange"];
    function handleClick() {
      console.log("click!");
    }

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <ListItem
            handleClick={handleClick}
            text={loremIpsum()}
        />
    );
  });

  it("Update Text", () => this.props({ text: loremIpsum() }));
  it("Clear Style", () => this.props({ style: {}}));
  it("Random Style", () => this.props({
    style: {
      padding: 10,
      listStyleType: "none",
      background: this.colors[Math.floor(Math.random() * this.colors.length)],
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    }
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### ListItem
  `);
});
