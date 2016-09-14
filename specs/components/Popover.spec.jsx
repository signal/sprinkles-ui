/* eslint func-names: "off" */

import React from 'react';
import loremIpsum from 'lorem-ipsum';
import Popover from '../../src/components/Popover';
import { Colors } from '../../src/shared/colors';


// Wrapper to contain a Popover and an anchor element
class PopoverWrapper extends React.Component {
  static propTypes = {
    anchorOrigin: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    children: React.PropTypes.node,
    contentWidth: React.PropTypes.number,
    open: React.PropTypes.bool,
    onRequestOpen: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    triggerEl: React.PropTypes.node.isRequired,
    useLayerForClickAway: React.PropTypes.bool,
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
      background: Colors.info,
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
      </PopoverWrapper>
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

  - **anchorOrigin** *React.PropTypes.object* (optional) point on the anchorEl to anchor against
  - **children** *React.PropTypes.node* (optional) child components
  - **constrainWidth** *React.PropTypes.bool* (optional) when true keeps the width of the popover the same as the parent
  - **contentWidth** *React.PropTypes.number* (optional) specify a width of the popover, otherwise it will take the width of the triggerEl
  - **open** *React.PropTypes.bool* (optional) set the popover to be open or closed
  - **onRequestOpen** *React.PropTypes.func* (optional) callback called when popover is requesting to open
  - **onRequestClose** *React.PropTypes.func* (optional) callback called when popover is requesting to close
  - **triggerEl** *React.PropTypes.node* React node used to trigger the popover
  - **useLayerForClickAway** *React.PropTypes.bool* (optional) an invisible layer that takes up the whole screen, triggers onRequestClose when clicked
  `);
});
