import React from "react";
import loremIpsum from "lorem-ipsum";
import List from "../../src/components/List";


describe("List", function() {
  this.header(`## List`); // Markdown.

  before(() => {
    this.colors = ["black", "blue", "red", "green", "orange"];
    let listItems = [
      {
        key: "1",
        text: "Item 1",
        selected: false
      },
      {
        key: "2",
        text: "Item 2",
        selected: true
      }
    ];

    function handleItemClick(item) {
      console.log("item clicked: ", item);
    }

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <List
            handleItemClick={handleItemClick}
            listItems={listItems}
        />
    );
  });

  it("Update List Items", () => this.props({
    listItems: [
      {
        key: "1",
        text: loremIpsum(),
        selected: false
      },
      {
        key: "2",
        text: loremIpsum(),
        selected: true
      }
    ]
  }));

  it("Clear Item Style", () => this.props({
    itemStyle: {
      padding: 10,
      color: "#444"
    }
  }));

  it("Random Item Style", () => this.props({
    itemStyle: {
      padding: 10,
      listStyleType: "none",
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    }
  }));

  it("Clear Selected Item Style", () => this.props({
    selectedItemStyle: {
      padding: 10,
      background: "#3879D9",
      color: "white"
    }
  }));

  it("Random Selected Item Style", () => this.props({
    selectedItemStyle: {
      padding: 10,
      listStyleType: "none",
      background: this.colors[Math.floor(Math.random() * this.colors.length)],
      color: "white"
    }
  }));

  it("Clear List Style", () => this.props({
    style: {
      listStyleType: "none",
      padding: 0
    }
  }));

  it("Random List Style", () => this.props({
    style: {
      listStyleType: "none",
      padding: 0,
      border: "2px solid " + this.colors[Math.floor(Math.random() * this.colors.length)]
    }
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### List

  A list menu items with a selected and unselected style. Passes click events to parents.
  `);
});
