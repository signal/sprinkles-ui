/*
  The index of specs.

  Notice the require statement is embedded within a "describe"
  block.  Use this pattern to structure, nest and organize your
  visual tests.

*/


describe("Sprinkles UI", function() {
  require("./components/MyComponent.spec"); // Dummy component
  require("./components/MenuItem.spec");
  require("./components/Menu.spec");
});
