import React from "react";
import AlertMessage from "../../src/components/AlertMessage";
import List from "../../src/components/List";
import ListItem from "../../src/components/ListItem";
import Text from "../../src/components/Text";
import Svg from "../../src/components/SVG";

describe("AlertMessage", function() {
  this.header(`## Alert Message`); // Markdown.

  this.loadAlertMessage = (props) => {
    this.unload();
    this.load(
        <AlertMessage
            body={props.body}
            title={props.title}
            type={props.type}
        >
            {props.children}
        </AlertMessage>
    ).width("100%");
  }

  before(() => {
    this.loadAlertMessage({
      body: "Test",
      type: "info"
    });
  });

  it("Success message", () => this.loadAlertMessage({
    body: "Yay! It worked",
    title: "",
    type: "success"
  }));
  it("Success message with title", () => this.loadAlertMessage({
    body: "Yay! It worked",
    title: "WOW",
    type: "success"
  }));
  it("Info message", () => this.loadAlertMessage({
    body: "This is some information you might like",
    title: "",
    type: "info"
  }));
  it("Info message with title", () => this.loadAlertMessage({
    body: "This is some information you might like",
    title: "Note",
    type: "info"
  }));
  it("Warning message", () => this.loadAlertMessage({
    body: "Be careful you might run into a problem",
    title: "",
    type: "warning"
  }));
  it("Warning message with title", () => this.loadAlertMessage({
    body: "Be careful you might run into a problem",
    title: "Caution:",
    type: "warning"
  }));
  it("Danger message", () => this.loadAlertMessage({
    children: null,
    body: "Yikes! You dun broke it",
    title: "",
    type: "danger"
  }));
  it("Danger message with title", () => this.loadAlertMessage({
    children: <Text>{"You dun broke it"}</Text>,
    title: "Warning!",
    type: "danger"
  }));
  it("Danger message with child nodes", () => this.loadAlertMessage({
      title: "Please reset your password using the following criteria:",
      type: "danger",
      children: <List onClick={() => console.log("List clicked")}>
          <ListItem
              padding="10px 0 5px 0"
              showHoverEffect={false}
          >
              <Text fontSize={14}>
                  <Svg
                      fill="#fff"
                      height={5}
                      padding="0 5px 2px 0"
                      type="square"
                      width={5}
                  />{"At least 1 special character (e.g. ][?/<~!$#%)"}</Text>
          </ListItem>
          <ListItem
              padding="0 0 15px 0"
              showHoverEffect={false}
          >
              <Text fontSize={14}>
                  <Svg
                      fill="#fff"
                      height={5}
                      padding="0 5px 2px 0"
                      type="square"
                      width={5}
                  />{"At least 1 numeric character"}</Text>
          </ListItem>
      </List>
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A component that provides contextural feedback messages for typical user actions.

  #### API
  - **body** *React.PropTypes.oneOfType* string description or array of descriptions
  - **title** *React.PropTypes.string* (optional) Bold qualifier of message
  - **type** *React.PropTypes.oneOf* Sets the color of the alert message, one option must be specified: 'success', 'info', 'warning', 'danger'

  `);
});
