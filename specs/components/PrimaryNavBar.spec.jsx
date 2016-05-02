/* eslint func-names: "off" */

import React from "react";
import PrimaryNavBar from "../../src/components/PrimaryNavBar";
import VectorGraphic from "../../src/components/VectorGraphic";
import List from "../../src/components/List";
import ListItem from "../../src/components/ListItem";
import TextListItem from "../../src/components/TextListItem";

describe("PrimaryNavBar", function () {
  this.header(`
  ## NavBar
  `); // Markdown.

  this.isExpanded = false;
  const handleExpansionToggle = () => {
    this.isExpanded = this.isExpanded !== true;
    this.loadPrimaryNav({ isExpanded: this.isExpanded });
  };

  this.loadPrimaryNav = (props) => {
    this.unload();
    this.load(
      <PrimaryNavBar
        appIcon={
          <VectorGraphic
            height={60}
            width={60}
          >
            <circle
              cx="30"
              cy="30"
              fill="red"
              r="30"
            />
          </VectorGraphic>
        }
        centerNavItems={
          <List>
            <ListItem>
              <TextListItem
                text={"Nav Item 1"}
              />
            </ListItem>
            <ListItem>
              <TextListItem
                text={"Nav Item 2"}
              />
            </ListItem>
            <ListItem>
              <TextListItem
                text={"Nav Item 3"}
              />
            </ListItem>
          </List>
        }
        bottomNavItems={
          <List>
            <ListItem>
              <TextListItem
                text={"Settings"}
              />
            </ListItem>
          </List>
        }
        expansionToggle={
          <List>
            <ListItem
              onClick={handleExpansionToggle.bind(this)}
            >
              <TextListItem
                text={(props.isExpanded) ? "<" : ">" }
              />
            </ListItem>
          </List>
        }
        showSectionBorders={props.showSectionBorders}
      />
  ).width(props.isExpanded ? "200px" : "60px");
  };

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.loadPrimaryNav({});
  });
  it("Expands navigation", () => this.loadPrimaryNav({ isExpanded: true }));
  it("Collapses navigation", () => this.loadPrimaryNav({ isExpanded: false }));
  it("Shows sectional borders", () => this.loadPrimaryNav({ showSectionBorders: true }));
  it("Hides sectional borders", () => this.loadPrimaryNav({ showSectionBorders: false }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### NavBar

  Primary Navigation Bar

  #### API

  - coming soon

  `);
});
