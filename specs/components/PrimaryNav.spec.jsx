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

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### PrimaryNav
  - **appIcon** *React.PropTypes.node* (optional) Component used for branding purposes
  - **appName** *React.PropTypes.string* (optional) Text based label for your branding
  - **expanded** *React.PropTypes.bool* used to open or close the panel, defaults to true
  - **navItems** *React.PropTypes.arrayOf(React.PropTypes.shape)* array of objects used to populate the navigation
    - **height** *React.PropTypes.number* height of navigation item
    - **icon** *React.PropTypes.number* component used as an icon for the navigation item
    - **label** *React.PropTypes.string* label for the navigation item
    - **linkStyle** *React.PropTypes.shape* styling the text of the navigation item
      - **color** *React.PropTypes.number* color of the text
      - **fontSize** *React.PropTypes.number* specify size
      - **fontWeight** *React.PropTypes.number* defaults to 'normal'
      - **textDecoration** *React.PropTypes.oneOf* modify text treatment, options: 'underline', 'overline', 'line-through', 'none'
    - **urlPath** *React.PropTypes.number* url to navigate to, triggers use of React Router
    - **width** *React.PropTypes.number* width of navigation item
  - **onNavItemClick** *React.PropTypes.function* gets fired on click
  - **onRequestExpandToggle** *React.PropTypes.function* gets fired when the panel open/close button is clicked
  - **selectedNavItem** *React.PropTypes.string* specify which navigation item is selected, maps to navigationItem key
  - **showSectionBorders** *React.PropTypes.bool* specify is borders inbetween elements should be visible
  `);
});
