/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import Menu from '../../src/components/Menu';
import ListItem from '../../src/components/ListItem';
import TextListItem from '../../src/components/TextListItem';

describe('Menu', function () {
  this.header(`
  ## Menu
  `); // Markdown.

  before(() => {
    const handleClick = (item) => {
      console.log(item);
    };
    const handleRequestOpen = () => {
      this.props({
        open: true,
      });
    };
    const handleRequestClose = () => this.props({ open: false });
    this.component(
      <Menu
        triggerEl={<div>Click Me</div>}
        onClick={handleClick}
        onRequestOpen={handleRequestOpen}
        onRequestClose={handleRequestClose}
        useLayerForClickAway={true}
        children={
          <div>
            <div>
              <ListItem>
                <TextListItem
                  text={'Back'}
                />
              </ListItem>
              <ListItem>
                <TextListItem
                  text={'Forward'}
                />
              </ListItem>
              <ListItem>
                <TextListItem
                  text={'Reload'}
                />
              </ListItem>
            </div>
            <div>
              <ListItem>
                <TextListItem
                  text={'Save As...'}
                />
              </ListItem>
            </div>
          </div>
        }
      />
    ).width('100%');
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Field

  A Menu Element

  #### API

  `);
});
