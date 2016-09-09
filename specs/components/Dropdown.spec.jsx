/* eslint func-names: "off" */
/* eslint no-console: "off" */
/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import Dropdown from '../../src/components/Dropdown';
import { Colors } from '../../src/shared/colors';

class DropdownWrapper extends React.Component {
  static propTypes = {
    anchorOrigin: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
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

  A dropdown component

  #### API

  - coming soon

  `);
});
