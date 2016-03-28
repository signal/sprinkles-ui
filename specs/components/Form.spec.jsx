import React from "react";
import loremIpsum from "lorem-ipsum";
import Form from "../../src/components/Form";
import Field from "../../src/components/Field";
import EmailInput from "../../src/components/EmailInput";
import PasswordInput from "../../src/components/PasswordInput";
import ListItem from "../../src/components/ListItem";
import List from "../../src/components/List";
import Svg from "../../src/components/SVG";
import Text from "../../src/components/Text";


describe("Form", function() {
  this.header(`## Form`); // Markdown.

  before(() => {
    function handleSubmit(submitData) {
      this.props({
        alert: null,
        working: true
      });
      setTimeout(() => {
        this.props({
          alert: {
            type: "success",
            title: "Woo Hoo!",
            details: "You're logged in"
          },
          working: false
        });
      }, 2000);
    }
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.load(
        <Form
            onSubmit={handleSubmit.bind(this)}
            submitButtonText={"Login"}
        >
            <Field
                fieldKey={"email"}
                label={"Email"}
                required={true}
            >
                <EmailInput placeholder={"test@signal.co"} />
            </Field>
            <Field
                fieldKey={"password"}
                label={"Password"}
                required={true}
            >
                <PasswordInput placeholder={"password"} />
            </Field>
        </Form>
    ).width("100%");
  });

  it("Set Alert", () => this.props({alert: {
    type: "danger",
    title: "Please reset your password using the following criteria:",
    children: <List onClick={() => console.log("List clicked")}>
        <ListItem
            padding="10px 0 5px 0"
            showHoverEffect={false}
        >
            <Text
                color={"white"}
                fontSize={14}
            >
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
            <Text
                color={"white"}
                fontSize={14}
            >
                <Svg
                    fill="#fff"
                    height={5}
                    padding="0 5px 2px 0"
                    type="square"
                    width={5}
                />{"At least 1 numeric character"}</Text>
        </ListItem>
    </List>
  }}));
  it("Clear Alert", () => this.props({alert: undefined}));
  it("Button Text: My Button", () => this.props({submitButtonText: "My Button"}));
  it("Button Text: Login", () => this.props({submitButtonText: "Login"}));
  it("Set Working", () => this.props({working: true}));
  it("Clear Working", () => this.props({working: false}));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Form

  A Form Element

  #### API

  - **alert** *React.PropTypes.shape* (optional)
    - **children** *React.PropTypes.node* (optional) child elements, appended after alert title and details
    - **details** *React.PropTypes.string* (optional) alert details text
    - **title** *React.PropTypes.string* (optional) alert title text (bold)
    - **type** *React.PropTypes.oneOf* Alert type one of: ["success", "info", "warning", "danger"]
  - **onSubmit** *React.PropTypes.func* (optional) called when Form has been submitted
  - **submitButtonText** *React.PropTypes.string* (optional) set form submit button text
  - **working** *React.PropTypes.bool* (optional) disables user input and shows working state on submit button when set to true

  `);
});
