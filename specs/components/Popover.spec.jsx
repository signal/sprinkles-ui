/* eslint func-names: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import loremIpsum from 'lorem-ipsum';
import Popover from '../../src/components/Popover';
import { NoticeColors } from '../../src/shared/colors';


// Wrapper to contain a Popover and an anchor element
class PopoverWrapper extends React.Component {
  static propTypes = {
    anchorOrigin: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    children: PropTypes.node,
    contentWidth: PropTypes.number,
    open: PropTypes.bool,
    onRequestOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    triggerEl: PropTypes.node.isRequired,
    useLayerForClickAway: PropTypes.bool,
  };

  static defaultProps = {
    text: '',
  };

  displayName = 'PopoverWrapper';

  render() {
    return (
      <Popover
        anchorOrigin={this.props.anchorOrigin}
        contentWidth={this.props.contentWidth}
        open={this.props.open}
        onRequestOpen={this.props.onRequestOpen}
        onRequestClose={this.props.onRequestClose}
        triggerEl={this.props.triggerEl}
        useLayerForClickAway={this.props.useLayerForClickAway}
      >
        {this.props.children}
      </Popover>
    );
  }
}

describe('Popover', function () {
  this.header(`
  ## Popover
  `); // Markdown.

  before(() => {
    const handleRequestOpen = () => {
      this.props({
        open: true,
      });
    };

    const handleRequestClose = () => {
      this.props({
        open: false,
      });
    };

    const anchorDivStyle = {
      boxSizing: 'border-box',
      padding: 10,
      background: NoticeColors.info,
      color: '#FEFEFE',
      cursor: 'pointer',
      display: 'inline-flex',
    };

    const popoverStyle = {
      background: 'white',
      border: '1px solid grey',
    };
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <PopoverWrapper
        anchorOrigin={'bottom'}
        onRequestOpen={handleRequestOpen}
        onRequestClose={handleRequestClose}
        triggerEl={(
          <div style={anchorDivStyle}>
            {'Click Me'}
          </div>
        )}
        useLayerForClickAway={true}
      >
        <div style={popoverStyle}>{loremIpsum({
          count: 1,
        })}
        </div>
      </PopoverWrapper>,
    );
  });

  it('open', () => this.props({
    open: true,
  }));

  it('close', () => this.props({
    open: false,
  }));

  it('anchorOrigin bottom', () => this.props({
    anchorOrigin: 'bottom',
    open: true,
  }));

  it('anchorOrigin left', () => this.props({
    anchorOrigin: 'left',
    open: true,
  }));

  it('anchorOrigin right', () => this.props({
    anchorOrigin: 'right',
    open: true,
  }));

  it('anchorOrigin top', () => this.props({
    anchorOrigin: 'top',
    open: true,
  }));

  it('set width', () => this.props({
    contentWidth: 200,
  }));

  it('clear width', () => this.props({
    contentWidth: undefined,
  }));

  it('set close layer', () => this.props({
    useLayerForClickAway: true,
  }));

  it('clear close layer', () => this.props({
    useLayerForClickAway: undefined,
  }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Text

  A Popver element

  #### API

  - **anchorOrigin** *PropTypes.object* (optional) point on the anchorEl to anchor against
  - **children** *PropTypes.node* (optional) child components
  - **constrainWidth** *PropTypes.bool* (optional) when true keeps the width of the popover the same as the parent
  - **contentWidth** *PropTypes.number* (optional) specify a width of the popover, otherwise it will take the width of the triggerEl
  - **open** *PropTypes.bool* (optional) set the popover to be open or closed
  - **onRequestOpen** *PropTypes.func* (optional) callback called when popover is requesting to open
  - **onRequestClose** *PropTypes.func* (optional) callback called when popover is requesting to close
  - **triggerEl** *PropTypes.node* React node used to trigger the popover
  - **useLayerForClickAway** *PropTypes.bool* (optional) an invisible layer that takes up the whole screen, triggers onRequestClose when clicked
  `);
});
