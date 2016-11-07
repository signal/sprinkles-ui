import React from 'react';
import ReactDOM from 'react-dom';
import color from 'color';
import TestUtils from 'react-addons-test-utils';
import { BackgroundColors } from '../src/shared/colors';
import PrimaryNav from '../src/components/PrimaryNav';

describe('Primary Navigation Bar', () => {
  it('does render a Bar', () => {
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav />
    );
    expect(primaryNavComponent).toBeDefined();
  });

  it('does render a PrimaryNav with expected style', () => {
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav />
    );
    const primaryNavNode = ReactDOM.findDOMNode(primaryNavComponent);
    expect(color(primaryNavNode.style.background).hexString()).toBe(BackgroundColors.primaryNav);
    expect(primaryNavNode.style.flexDirection).toBe('column');
    expect(primaryNavNode.style.alignItems).toBe('stretch');
    expect(primaryNavNode.style.height).toBe('100%');
    expect(primaryNavNode.style.width).toBe('100%');
  });

  it('does render a PrimaryNav app icon', () => {
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav
        appIcon={
          <div />
        }
      />
    );
    expect(primaryNavComponent.appIconRef).toBeDefined();
  });

  it('does render a PrimaryNav app name', () => {
    const appName = 'My Cool App';
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav appName={appName} />
    );
    const appNameNode = ReactDOM.findDOMNode(primaryNavComponent.appNameRef);
    expect(appNameNode.textContent).toBe(appName);
    expect(primaryNavComponent.appNameRef).toBeDefined();
  });

  it('does render PrimaryNav navItems', () => {
    const navItems = [
      {
        height: 20,
        icon: <div />,
        label: 'Item 1',
        key: 'item-1',
        width: 20,
      },
    ];
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav navItems={navItems} />
    );
    expect(primaryNavComponent.listItemRef.listItemRefs.count()).toBe(1);
  });

  it('does render PrimaryNav expandToggle', () => {
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav />
    );
    expect(primaryNavComponent.expandToggleRef).toBeDefined();
  });

  it('does trigger onRequestExpandToggle callback when expandToggle clicked', () => {
    const mockHandleRequestExpandToggle = jest.fn();
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav onRequestExpandToggle={mockHandleRequestExpandToggle} />
    );
    const expandNode = ReactDOM.findDOMNode(primaryNavComponent.expandToggleRef);
    TestUtils.Simulate.click(expandNode);
    expect(mockHandleRequestExpandToggle).toBeCalled();
  });

  it('does trigger onNavItemClick callback when navItem clicked', () => {
    const mockHandleNavItemClick = jest.fn();
    const navItems = [
      {
        icon: <div />,
        label: 'Item 1',
        key: 'item-1',
      },
    ];
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav
        navItems={navItems}
        onNavItemClick={mockHandleNavItemClick}
      />
    );
    expect(primaryNavComponent.listItemRef.listItemRefs.count()).toBe(1);
    const listItem = ReactDOM.findDOMNode(
      primaryNavComponent.listItemRef.listItemRefs.get(0)
    );
    TestUtils.Simulate.click(listItem);
    expect(mockHandleNavItemClick).toBeCalledWith(navItems[0].key);
  });

  it('does set selectedNavItem', () => {
    const navItems = [
      {
        icon: <div />,
        label: 'Item 1',
        key: 'item-1',
      },
    ];
    const selectedNavItem = 'item-1';
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav
        navItems={navItems}
        selectedNavItem={selectedNavItem}
      />
    );
    expect(primaryNavComponent.listItemRef.listItemRefs.get(0).props.selected)
      .toBe(true);
  });

  it('does set render a react-router link', () => {
    const navItems = [
      {
        icon: <div />,
        label: 'Item 1',
        key: 'item-1',
        urlPath: '/path',
      },
    ];
    const primaryNavComponent = TestUtils.renderIntoDocument(
      <PrimaryNav
        navItems={navItems}
      />
    );

    expect(ReactDOM.findDOMNode(primaryNavComponent.listItemRef.listItemRefs.get(0).listItemRef.linkRef))
      .not.toBeNull();
  });
});
