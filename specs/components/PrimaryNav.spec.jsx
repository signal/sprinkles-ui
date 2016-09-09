/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import PrimaryNav from '../../src/components/PrimaryNav';
import VectorGraphic from '../../src/components/VectorGraphic';

describe('PrimaryNav', function () {
  this.header(`
  ## PrimaryNav
  `); // Markdown.

  this.loadPrimaryNav = (props = { expanded: true }) => {
    const handleRequestExpandToggle = () => {
      const curProps = props;
      curProps.expanded = !curProps.expanded;
      this.loadPrimaryNav(curProps);
    };
    const handleNavItemClick = (item) => {
      console.log('item clicked:', item);
    };
    this.unload();
    this.component(
      <PrimaryNav
        appIcon={
          <VectorGraphic
            height={60}
            width={60}
          >
            <circle
              cx={'30'}
              cy={'30'}
              fill={'red'}
              r={'26'}
            />
          </VectorGraphic>
        }
        appName={'My Cool App'}
        navItems={
          [
            {
              icon: <VectorGraphic
                height={16}
                width={16}
              >
                <circle
                  cx={'8'}
                  cy={'8'}
                  fill={'red'}
                  r={'14'}
                />
              </VectorGraphic>,
              label: 'Item 1',
              key: 'item-1',
            },
            {
              icon: <VectorGraphic
                height={16}
                width={16}
              >
                <circle
                  cx={'8'}
                  cy={'8'}
                  fill={'red'}
                  r={'14'}
                />
              </VectorGraphic>,
              label: 'Item 2',
              key: 'item-2',
            },
          ]
        }
        showSectionBorders={props.showSectionBorders}
        expanded={props.expanded}
        onRequestExpandToggle={handleRequestExpandToggle}
        onNavItemClick={handleNavItemClick}
        selectedNavItem={props.selectedNavItem}
      />
  ).width(props.expanded ? '200px' : '60px').height('500px');
  };

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.loadPrimaryNav({ expanded: true });
  });
  it('Expands navigation', () => this.loadPrimaryNav({ expanded: true }));
  it('Collapses navigation', () => this.loadPrimaryNav({ expanded: false }));
  it('Shows sectional borders', () => this.loadPrimaryNav({ showSectionBorders: true }));
  it('Hides sectional borders', () => this.loadPrimaryNav({ showSectionBorders: false }));
  it('Selects the first nav item', () => this.loadPrimaryNav({ selectedNavItem: 'item-1' }));
  it('Selects nothing', () => this.loadPrimaryNav({ selectedNavItem: undefined }));
});
