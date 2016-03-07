/*
  The index of specs.

  Notice the require statement is embedded within a "describe"
  block.  Use this pattern to structure, nest and organize your
  visual tests.

*/


describe("Sprinkles UI", function() {
  require("./components/MyComponent.spec"); // Dummy component
  require("./components/ListItem.spec");
  require("./components/List.spec");
  require("./components/Text.spec");
  require("./components/Popover.spec");
  require("./components/TextInput.spec");
  require("./components/Field.spec");
});
