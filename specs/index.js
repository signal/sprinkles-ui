/*
  The index of specs.

  Notice the require statement is embedded within a "describe"
  block.  Use this pattern to structure, nest and organize your
  visual tests.

*/


describe("Sprinkles UI", () => {
  describe("Form, Field and Inputs", () => {
    require("./components/Field.spec");
    require("./components/Form.spec");
    require("./components/TextInput.spec");
    require("./components/PasswordInput.spec");
    require("./components/EmailInput.spec");
    require("./components/RadioButtonInput.spec");
    require("./components/KeyValueInput.spec");
  });
  describe("List and List Item", () => {
    require("./components/List.spec");
    require("./components/ListItem.spec");
    require("./components/TextListItem.spec");
  });
  describe("Buttons", () => {
    require("./components/Button.spec");
    require("./components/ButtonGroup.spec");
  });
  require("./components/Alert.spec");
  require("./components/Text.spec");
  require("./components/Popover.spec");
  require("./components/VectorGraphic.spec");
  require("./components/Version.spec");
  require("./components/Drawer.spec");
  require("./components/colors.spec");
});
