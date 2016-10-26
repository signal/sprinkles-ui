/* eslint func-names: "off" */
/* eslint no-console: "off" */
/* eslint react/no-unused-prop-types: "off" */
/* eslint max-len: "off" */

import React from 'react';
import Dropdown from '../../src/components/Dropdown';
import { Colors } from '../../src/shared/colors';

class DropdownWrapper extends React.Component {
  static propTypes = {
    anchorOrigin: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    disabled: React.PropTypes.bool,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
    open: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onRequestOpen: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    triggerEl: React.PropTypes.node,
    useLayerForClickAway: React.PropTypes.bool,
  };

  displayName = 'DropdownWrapper';

  render() {
    return (
      <Dropdown
        disabled={this.props.disabled}
        triggerEl={this.props.triggerEl}
        anchorOrigin={this.props.anchorOrigin}
        open={this.props.open}
        items={this.props.items}
        onClick={this.props.onClick}
        onRequestClose={this.props.onRequestClose}
        onRequestOpen={this.props.onRequestOpen}
        useLayerForClickAway={this.props.useLayerForClickAway}
      />
    );
  }
}

describe('Dropdown', function () {
  this.header(`
  ## Dropdown
  `); // Markdown.

  before(() => {
    const handleRequestOpen = () => {
      this.props({
        open: true,
      });
    };
    const handleClick = (item) => {
      console.log('Item Clicked', item);
      this.props({
        open: false,
      });
    };
    const handleRequestClose = () => this.props({ open: false });

    const triggerDivStyle = {
      padding: 10,
      background: Colors.info,
      color: '#FEFEFE',
      cursor: 'pointer',
    };

    this.load(
      <DropdownWrapper
        items={[
          {
            key: 'thing1',
            value: 'Thing 1',
          },
          {
            key: 'thing2',
            value: 'Thing 2',
          },
        ]}
        open={false}
        onClick={handleClick}
        onRequestOpen={handleRequestOpen}
        onRequestClose={handleRequestClose}
        triggerEl={(
          <div
            style={triggerDivStyle}
          >
            {'Dropdown'}
          </div>)}
        useLayerForClickAway={true}
      />
    );
  });

  it('Open Dropdown', () => this.props({ open: true }));
  it('Close Dropdown', () => this.props({ open: false }));
  it('Disable Dropdown', () => this.props({ disabled: true }));
  it('Enable Dropdown', () => this.props({ disabled: false }));
  it('anchorOrigin bottom', () => this.props({
    anchorOrigin: 'bottom',
  }));

  it('anchorOrigin right', () => this.props({
    anchorOrigin: 'right',
  }));

  it('anchorOrigin top', () => this.props({
    anchorOrigin: 'top',
  }));

  it('anchorOrigin left', () => this.props({
    anchorOrigin: 'left',
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Dropdown

  A dropdown component. Designed to be used in menus and non-form locations. If you want to use this in a form, look at the select input component.

  #### API

  - **anchorOrigin** *React.PropTypes.object* (optional) point on the anchorEl to anchor against
  - **disabled** *React.PropTypes.bool* (optional) disable the dropdown from opening. Note: you must provide your own disabled style if so desired for the trigger element
  - **items** *React.PropTypes.arrayOf(React.PropTypes.shape)* (optional)
    - **key** *React.PropTypes.string* (optional) Text visible for this row in the dropdown
    - **value** *React.PropTypes.string* (optional) Value that gets returned on click
  - **open** *React.PropTypes.bool* (optional) set the dropdown to be open or closed
  - **onClick** *React.PropTypes.func* (optional) callback called when a dropdown item is clicked
  - **onRequestClose** *React.PropTypes.func* (optional) callback called when dropdown is requesting to close
  - **onRequestOpen** *React.PropTypes.func* (optional) callback called when dropdown is requesting to open
  - **triggerEl** *React.PropTypes.node* React node used to trigger the dropdown
  - **useLayerForClickAway** *React.PropTypes.bool* (optional) an invisible layer that takes up the whole screen, triggers onRequestClose when clicked

  `);
});
