/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import Checkbox from '../../src/components/Checkbox';

describe('Checkbox', function () {
  this.header(`
  ## Checkbox
  `);

  const handleChange = (item) => {
    this.props({ checked: !!item.target.checked });
  };

  before(() => {
    this.component(
      <Checkbox
        onChange={handleChange}
      />,
    );
  });

  it('Is checked', () => this.props({ checked: true }));
  it('Not checked', () => this.props({ checked: false }));
  it('Is Disabled', () => this.props({ enabled: false }));
  it('Is Enabled', () => this.props({ enabled: true }));
  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Checkbox

  A checkbox to select an item

  - **checked** *PropTypes.bool* (optional) sets default checked value
  - **enabled** *PropTypes.bool* (optional) disables checkbox
  - **onBlur** *PropTypes.func* (optional) triggers event when checkbox loses focus
  - **onChange** *PropTypes.func* callback called when the value of the input changes
  - **onClick** *PropTypes.func* click hander function
  - **onFocus** *PropTypes.func* (optional) triggers event when checkbox gains focus

  #### API
  `);
});
