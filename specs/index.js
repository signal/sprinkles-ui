/* eslint global-require: "off" */
/*
  The index of specs.

  Notice the require statement is embedded within a 'describe'
  block.  Use this pattern to structure, nest and organize your
  visual tests.

*/


describe('Sprinkles UI', () => {
  describe('Buttons', () => {
    require('./components/Button.spec');
    require('./components/ButtonGroup.spec');
  });
  describe('Form, Field and Inputs', () => {
    require('./components/Checkbox.spec');
    require('./components/Field.spec');
    require('./components/Form.spec');
    require('./components/TextInput.spec');
    require('./components/PasswordInput.spec');
    require('./components/EmailInput.spec');
    require('./components/RadioButtonInput.spec');
    require('./components/KeyValueInput.spec');
    require('./components/SelectInput.spec');
    require('./components/ToggleInput.spec');
    require('./components/SearchInput.spec');
  });
  describe('List and List Item', () => {
    require('./components/BulletedList.spec');
    require('./components/List.spec');
    require('./components/ListItemGroup.spec');
    require('./components/ListItem.spec');
    require('./components/TextListItem.spec');
    require('./components/NavListItem.spec');
  });
  describe('Navigation', () => {
    require('./components/Breadcrumbs.spec');
    require('./components/SecondaryNav.spec');
    require('./components/PrimaryNav.spec');
  });
  require('./components/Alert.spec');
  require('./components/ButtonGroup.spec');
  require('./components/colors.spec');
  require('./components/DataTable.spec');
  require('./components/Drawer.spec');
  require('./components/Dropdown.spec');
  require('./components/Menu.spec');
  require('./components/Panel.spec');
  require('./components/Popover.spec');
  require('./components/Text.spec');
  require('./components/Theme.spec');
  require('./components/VectorGraphic.spec');
  require('./components/Version.spec');
});
