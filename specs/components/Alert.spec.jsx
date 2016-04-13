/* eslint func-names: "off" */
/* eslint no-console: "off" */
/* eslint max-len: "off" */

import React from "react";
import Alert from "../../src/components/Alert";
import List from "../../src/components/List";
import ListItem from "../../src/components/ListItem";
import Text from "../../src/components/Text";

describe("Alert", function () {
  this.header(`
  ## Alert Message
  `); // Markdown.

  this.loadAlert = (props) => {
    this.unload();
    this.load(
      <Alert
        details={props.details}
        title={props.title}
        type={props.type}
      >
        {props.children}
      </Alert>
    ).width("100%");
  };

  before(() => {
    this.loadAlert({
      details: "Test",
      type: "info",
    });
  });

  it("Success message", () => this.loadAlert({
    details: "Yay! It worked",
    title: "",
    type: "success",
  }));
  it("Success message with title", () => this.loadAlert({
    details: "Yay! It worked",
    title: "WOW",
    type: "success",
  }));
  it("Info message", () => this.loadAlert({
    details: "This is some information you might like",
    title: "",
    type: "info",
  }));
  it("Info message with title", () => this.loadAlert({
    details: "This is some information you might like",
    title: "Note",
    type: "info",
  }));
  it("Warning message", () => this.loadAlert({
    details: "Be careful you might run into a problem",
    title: "",
    type: "warning",
  }));
  it("Warning message with title", () => this.loadAlert({
    details: "Be careful you might run into a problem",
    title: "Caution:",
    type: "warning",
  }));
  it("Danger message", () => this.loadAlert({
    children: null,
    details: "Yikes! You dun broke it",
    title: "",
    type: "danger",
  }));
  it("Danger message with title", () => this.loadAlert({
    children:
      <Text
        color={"white"}
        fontSize={20}
      >
        {"You dun broke it"}
      </Text>,
    title: "Warning!",
    type: "danger",
  }));
  it("Danger message with child nodes", () => this.loadAlert({
    title: "Please reset your password using the following criteria:",
    type: "danger",
    children:
      <List onClick={() => console.log("List clicked")}>
          <ListItem
            padding="10px 0 5px 0"
            showHoverEffect={false}
          >
              <Text
                color={"white"}
                fontSize={14}
              >
                {"◼︎ At least 1 special character (e.g. ][?/<~!$#%)"}
              </Text>
          </ListItem>
          <ListItem
            padding="0 0 15px 0"
            showHoverEffect={false}
          >
            <Text
              color={"white"}
              fontSize={14}
            >
                {"◼︎ At least 1 numeric character"}
            </Text>
          </ListItem>
      </List>,
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A component that provides contextural feedback messages for typical user actions.

  #### API
  - **details** *React.PropTypes.oneOfType* string description or array of descriptions
  - **title** *React.PropTypes.string* (optional) Bold qualifier of message
  - **type** *React.PropTypes.oneOf* Sets the color of the alert message, one option must be specified: 'success', 'info', 'warning', 'danger'

  `);
});
