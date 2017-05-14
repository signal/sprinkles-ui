/* eslint func-names: "off" */
/* eslint no-console: "off" */
/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../../src/components/SelectInput';

class SelectInputWrapper extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool,
    initialValue: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ),
    onChange: PropTypes.func,
    status: PropTypes.oneOf(['error', 'warning', 'success']),
  };

  displayName = 'SelectInputWrapper';

  render() {
    return (
      <SelectInput
        enabled={this.props.enabled}
        items={this.props.items}
        onChange={this.props.onChange}
      />
    );
  }
}

describe('SelectInput', function () {
  this.header(`
  ## SelectInput
  `); // Markdown.

  before(() => {
    const handleChange = (value) => console.log('change: ', value);

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <SelectInputWrapper
        items={[{
          value: 'thing-1',
          label: 'Thing 1',
        }, {
          value: 'thing-2',
          label: 'Thing 2',
        }, {
          value: 'thing-3',
          label: 'Thing 3',
        }]}
        onChange={handleChange}
      />,
    ).width(200);
  });

  it('disabled', () => this.props({ enabled: false }));
  it('enabled', () => this.props({ enabled: true }));
  it('Set Success Status', () => this.props({ status: 'success' }));
  it('Set Warning Status', () => this.props({ status: 'warning' }));
  it('Set Error Status', () => this.props({ status: 'error' }));
  it('Clear Status', () => this.props({ status: undefined }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### SelectInput

  A SelectInput Element, this element is inteded to be used for a form. If you're looking for more flexibiity and desire a menu,
  take a look a the DropDown component.

  #### API
  - **enabled** *PropTypes.bool* (optional) disable the prop, by default this is true
  - **initialValue** *PropTypes.string* (optional) set the initial value of the field
  - **items** *PropTypes.arrayOf(PropTypes.shape)* (optional) an array of objects used to construct the dropdown
    - **value** *PropTypes.string* (optional) value of an item passed through your form
    - **label** *PropTypes.string* (optional) label visible to the user
  - **onChange** *PropTypes.function* (optional) called whenever the form chnages by the user
  - **status** *PropTypes.oneOf* (optional) state used by form to style input, options: 'error', 'warning', 'success'
  `);
});
