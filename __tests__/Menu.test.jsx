// don't mock our CUT or components it depends on
jest.dontMock('../src/components/Menu');
jest.dontMock('../src/components/MenuItem');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Menu = require("../src/components/Menu").default;


describe('Menu', () => {
  it('Renders a Menu', () => {
    const menuItems = [
      {
        key: "1",
        text: "Item 1",
        selected: false
      },
      {
        key: "2",
        text: "Item 2",
        selected: true
      }
    ];
    // Render a Menu with no style
    const menu = TestUtils.renderIntoDocument(
      <Menu menuItems={ menuItems } />
    );

    // grab the DOM node so we can inspect it
    const menuItemNode = ReactDOM.findDOMNode(menu);
    [].slice.call(menuItemNode.querySelectorAll("li")).map((item,i) => {
      expect(item.textContent).toEqual(menuItems[i].text);
    });
  });

});
