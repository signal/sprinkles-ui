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
    const defaultNavItems =
      [
        {
          icon: <VectorGraphic
            height={16}
            width={16}
          >
            <circle
              cx={'8'}
              cy={'8'}
              fill={'white'}
              r={'14'}
            />
          </VectorGraphic>,
          label: 'Item 2',
          key: 'item-2',
        },
        {
          icon: <VectorGraphic
            height={16}
            width={16}
          >
            <circle
              cx={'8'}
              cy={'8'}
              fill={'white'}
              r={'14'}
            />
          </VectorGraphic>,
          label: 'Item 1',
          key: 'item-1',
        },
      ];
    const handleRequestExpandToggle = () => {
      const curProps = props;
      curProps.expanded = !curProps.expanded;
      curProps.navItems = defaultNavItems;
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
              fill={'white'}
              r={'26'}
            />
          </VectorGraphic>
        }
        appName={'My Cool App'}
        children={props.children}
        navItems={props.navItems || defaultNavItems}
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
  it('Renders using react-router', () => this.loadPrimaryNav({
    expanded: true,
    navItems: [
      {
        children: <div>Item 1</div>,
        icon: <VectorGraphic
          height={16}
          width={16}
        >
          <circle
            cx={'8'}
            cy={'8'}
            fill={'white'}
            r={'14'}
          />
        </VectorGraphic>,
        label: 'Item 3',
        linkStyle: {
          color: 'red',
        },
        key: 'item-3',
        urlPath: '/item3',
      },
      {
        children: <div>Item 2</div>,
        icon: <VectorGraphic
          height={16}
          width={16}
        >
          <circle
            cx={'8'}
            cy={'8'}
            fill={'white'}
            r={'14'}
          />
        </VectorGraphic>,
        label: 'Item 4',
        key: 'item-4',
        urlPath: '/item4',
      },
    ],
  }));
});
